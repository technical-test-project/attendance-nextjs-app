import React, {useState} from "react";
import {DaisyUiButton} from "@/components/DaisyUi";

interface ButtonOptions {
    text?: string;
    hidden?: boolean;
    disabled?: boolean;
}

interface Options {
    btnConfirm?: ButtonOptions
    btnClose?: ButtonOptions
}


interface Props {
    isOpen: boolean;
    className?: string;
    title?: string;
    message?: string;
    onConfirm?: EventHandlerInterface;
    onClose?: EventHandlerInterface;
    options?: Options;
}

export default function DaisyUiComponent(props: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const btnCloseText = props.options?.btnClose?.text ?? 'Cancel'
    const btnConfirmText = props.options?.btnConfirm?.text ?? 'Submit'


    const handleOnConfirm = () => {
        setIsLoading(true)
        props.onConfirm()
    }

    const handleOnClose = () => {
        setIsLoading(false)
        props.onClose()
    }


    return <>
        <dialog className="modal modal-bottom sm:modal-middle bg-black bg-opacity-50" open={props.isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-xl">{props.title ?? 'Title'}</h3>
                <small>Click the button {btnCloseText} to close</small>
                <p className="py-4">{props.message ?? 'Apakah anda yakin ingin melakukan aksi ini?'}</p>
                <div className="modal-action gap-1.5">

                    {/* onClose */}
                    <DaisyUiButton className="bg-red-500 hover:bg-red-400"
                                   text={btnCloseText}
                                   disabled={isLoading}
                                   hidden={props.options?.btnClose?.hidden}
                                   onClick={handleOnClose}/>

                    {/* onConfirm */}
                    <DaisyUiButton className={!isLoading ? "" : "bg-base-200 hover:bg-base-300"}
                                   text={!isLoading ? btnConfirmText : ""}
                                   disabled={isLoading}
                                   hidden={props.options?.btnConfirm?.hidden}
                                   onClick={handleOnConfirm}>
                        {isLoading ? (<>
                            <span className="loading loading-spinner"></span>
                            loading </>) : null }
                    </DaisyUiButton>
                </div>
            </div>
        </dialog>
    </>
}
