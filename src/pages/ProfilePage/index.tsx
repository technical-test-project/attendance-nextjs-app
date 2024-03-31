import React, {ChangeEvent, useEffect, useState} from "react";
import StorageManager from "@/utils/storageManager";
import Helpers from "@/utils/helpers";
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {DaisyUiAvatar, DaisyUiButton, DaisyUiModal, DaisyUiTextInput} from "@/components/DaisyUi";
import {apiProfile} from "@/api/users";


export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [formInput, setFormInput] = useState({phone: null, password: null})
    const [photoFile, setPhotoFile] = useState<File | null>(null)
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        async function fetchUserProfile() {
            const response = await apiProfile()
            if (response.data){
                const refreshUser = response.data as User
                setUser(refreshUser)
            }
        }

        fetchUserProfile()
    }, []);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === 'photo') {
            const selectedFile = e.target.files?.[0] ?? null
            setPhotoFile(selectedFile)
        }
        setFormInput((prev: any) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const { phone, password} = formInput
        const formData = new FormData()

        if (photoFile){
            formData.append('photo', photoFile)
        }
        if (phone){
            formData.append('phone', phone)
        }
        if (password){
            formData.append('password', password)
        }

        console.log(formData)
    }


    return <>
        <DaisyUiModal isOpen={isOpenModal}
                      title={'Update Profile'}
                      message={'Apakah anda yakin ingin melakukan update profile?'}
                      options={{
                          btnConfirm: {text: 'Logout', className: 'bg-red-500 hover:bg-red-400'},
                          btnClose: {text: 'Batal', className: 'bg-blue-500 hover:bg-base-400'}}}
                      onConfirm={handleSubmit}
                      onClose={() => {
                          setIsOpenModal(false)
                      }}/>

        <div className="justify-items-stretch gap-4">

            <div className="card card-compact bg-base-300 shadow-xl mb-10 max-w-2xl mx-auto">
                <div className="card-body my-10">
                    <div className="flex flex-col items-center justify-center">
                        <DaisyUiAvatar className={"text-white"} src={null} height={175} width={175}/>

                        <h1 className="text-xl font-bold mb-2">{Helpers.ucWords(user?.profile?.name ?? '-')}</h1>
                        <p className="text-gray-200 mb-2">{user?.email}</p>
                        <p className="text-gray-200">{user?.profile?.phone ?? '-'}</p>
                    </div>
                </div>
            </div>

            <div className="card card-compact bg-base-300 shadow-xl">
                <div className="card-body my-10 space-y-6">
                    <div className="px-4">
                        <h2 className="text-base font-semibold leading-7 text-white">Profile</h2>

                        <p className="mt-1 text-sm leading-6 text-gray-200">
                            Informasi ini akan ditampilkan secara publik, jadi berhati-hatilah dengan apa yang Anda
                            bagikan.
                        </p>
                        <form method="post" onSubmit={() => handleSubmit}>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                                <div className="col-span-full">
                                    <label htmlFor="photo"
                                           className="block text-sm font-medium leading-6 text-gray-100">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <UserCircleIcon className="h-12 w-12 text-white" aria-hidden="true"/>
                                        <DaisyUiTextInput id={"photo"} type={"file"} onChange={handleInput}/>
                                    </div>
                                </div>


                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"name"} type={"text"} label={"Nama"}
                                                      defaultValue={Helpers.ucWords(user?.profile.name ?? '-')} readOnly/>
                                </div>

                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"email"} type={"text"} label={"Email"}
                                                      defaultValue={user?.email} readOnly/>
                                </div>

                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"position"} type={"text"} label={"Posisi"}
                                                      defaultValue={Helpers.ucWords(user?.position?.name ?? '-')}
                                                      readOnly/>
                                </div>
                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"phone"} type={"text"} label={"Nomor Hanphone"}
                                                      defaultValue={Helpers.formatPhoneNumber(user?.profile?.phone ?? '')}
                                                      inputMode={"numeric"}
                                                      pattern={"[0-9]*"}
                                                      required
                                                      onChange={handleInput}
                                    />
                                </div>

                                <div className="sm:col-span-8 flex flex-row-reverse">
                                    <DaisyUiButton text={"Update Profile"} className={"justify-end"} type={"submit"}/>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>


    </>
};