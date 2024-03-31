import {UserCircleIcon} from "@heroicons/react/24/solid";
import React from "react";
import Image from "next/image";
import {apiImageUrl} from "@/api/users";


interface Props {
    className: string;
    src: string | null;
    height: number;
    width: number;
}

export default function DaisyUiComponent(props: Props) {

    return <>
        {
            props.src
                ? (<Image src={props.src} alt={"Photo Profile"}
                          className={props.className}
                          height={props.height}
                          width={props.width}/>)
                : (<UserCircleIcon
                    aria-hidden="true"
                    className={"text-white"}
                    height={props.height}
                    width={props.width}/>)
        }
    </>
}