import React, {ChangeEvent, useEffect, useState} from "react";
import Helpers from "@/utils/helpers";
import {DaisyUiAvatar, DaisyUiButton, DaisyUiModal, DaisyUiTextInput} from "@/components/DaisyUi";
import {apiImageUrl, apiProfile, apiUpdateUserProfile} from "@/api/users";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router= useRouter()
    const [globalState, setGlobalState] = useState({
        user: null,
        openModalUpdateProfile: false,
        openModalUpdatePassword: false,
        photoFile: null,
        phone: null,
        password: null,
        passwordConfirmation: null,
    })

    const user = globalState.user as User | null


    useEffect(() => {
        fetchUserProfile()
    }, []);

    async function fetchUserProfile() {
        const response = await apiProfile()
        if (response.data) {
            const refreshUser = response.data as User
            setGlobalState((prev: any) => ({...prev, user: refreshUser}))
        }
    }

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.id === 'photo') {
            const selectedFile = e.target.files?.[0] ?? null
            setGlobalState((prev: any) => ({...prev, photoFile: selectedFile}))
        }
        setGlobalState((prev: any) => ({...prev, [e.target.id]: e.target.value}))
    }

    async function handleSubmit() {

        const {phone, photoFile, password, passwordConfirmation} = globalState
        const formData = new FormData()

        if (photoFile) {
            formData.append('photo', photoFile)
        }
        if (phone) {
            formData.append('phone', phone)
        }
        if (password) {
            formData.append('password', password)
        }

        try {
            const response = await apiUpdateUserProfile(Number(user?.id), formData)

            const timeout = setTimeout(() => {
                if (response.data) {
                    setGlobalState((prev: any) => ({
                        ...prev, openModalUpdateProfile: false, openModalUpdatePassword: false, photoFile: null,
                    }))

                    fetchUserProfile()

                    alert(response.message)
                    window.location.reload()
                }
            }, 1000)
            return () => clearTimeout(timeout)
        } catch (e) {
            setGlobalState((prev: any) => ({
                ...prev, openModalUpdateProfile: false, openModalUpdatePassword: false, photoFile: null,
            }))
            console.log(e)
        }
    }

    return <>
        <DaisyUiModal isOpen={globalState.openModalUpdateProfile}
                      title={'Update Profile'}
                      message={'Apakah anda yakin ingin melakukan update profile?'}
                      options={{
                          btnConfirm: {text: 'Update'}, btnClose: {text: 'Batal'}
                      }}
                      onConfirm={handleSubmit}
                      onClose={() => {
                          setGlobalState((prev: any) => ({
                              ...prev, openModalUpdateProfile: false, openModalUpdatePassword: false
                          }))
                      }}/>

        <DaisyUiModal isOpen={globalState.openModalUpdatePassword}
                      title={'Update Password'}
                      message={'Apakah anda yakin ingin melakukan update password?'}
                      options={{
                          btnConfirm: {text: 'Update'}, btnClose: {text: 'Batal'}
                      }}
                      onConfirm={handleSubmit}
                      onClose={() => {
                          setGlobalState((prev: any) => ({
                              ...prev, openModalUpdateProfile: false, openModalUpdatePassword: false
                          }))
                      }}/>
        <DaisyUiButton text={"Kembali"} className={"mb-4 mx-4"} onClick={()=> router.back()}/>

        <div className="justify-items-stretch gap-4 mb-6">

            <div className="card card-compact bg-base-300 shadow-xl mb-10 max-w-2xl mx-auto">
                <div className="card-body my-10">
                    <div className="flex flex-col items-center justify-center">
                        <DaisyUiAvatar className={"text-white rounded-full bg-white mb-4"}
                                       src={apiImageUrl(user?.profile.photoUrl, 'users')}
                                       height={180} width={180}/>

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
                        <form method="post" onSubmit={(e: any) => {
                            e.preventDefault()
                            setGlobalState((prev: any) => ({
                                ...prev, openModalUpdateProfile: true, openModalUpdatePassword: false
                            }))
                        }}>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                                <div className="col-span-full">
                                    <label htmlFor="photo"
                                           className="block text-sm font-medium leading-6 text-gray-100">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <DaisyUiAvatar className={"text-white rounded-full bg-white"}
                                                       src={apiImageUrl(user?.profile.photoUrl, 'users')}
                                                       height={45} width={45}/>

                                        <DaisyUiTextInput id={"photo"} type={"file"} onChange={handleInput}/>
                                    </div>
                                </div>


                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"name"} type={"text"} label={"Nama"}
                                                      defaultValue={Helpers.ucWords(user?.profile.name ?? '-')}
                                                      readOnly/>
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


        <div className="justify-items-stretch gap-4">

            <div className="card card-compact bg-base-300 shadow-xl">
                <div className="card-body my-10 space-y-6">
                    <div className="px-4">
                        <h2 className="text-base font-semibold leading-7 text-white">Password</h2>

                        <form method="post" onSubmit={(e: any) => {
                            e.preventDefault()

                            if (globalState.passwordConfirmation !== globalState.password) {
                                alert('Konfirmasi Password tidak sama dengan Password')
                                return
                            } else {
                                setGlobalState((prev: any) => ({
                                    ...prev, openModalUpdateProfile: false, openModalUpdatePassword: true
                                }))
                            }
                        }}>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"password"} type={"password"} label={"Password"}
                                                      onChange={handleInput} required/>
                                </div>

                                <div className="sm:col-span-4">
                                    <DaisyUiTextInput id={"passwordConfirmation"} type={"password"} label={"Konfirmasi Password"}
                                                      onChange={handleInput} required/>
                                </div>

                                <div className="sm:col-span-8 flex flex-row-reverse">
                                    <DaisyUiButton text={"Update Password"} className={"justify-end"} type={"submit"}/>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>


    </>
};