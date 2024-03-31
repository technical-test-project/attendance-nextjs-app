import {DaisyUiAvatar, DaisyUiButton, DaisyUiModal, DaisyUiTextInput} from "@/components/DaisyUi";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {apiDeleteUser, apiImageUrl, apiUserDetail} from "@/api/users";
import StorageManager from "@/utils/storageManager";


export default function UserDetailPage() {
    const router = useRouter()
    const params = useParams<{id: string}>()
    const [userDetail, setUserDetail] = useState<User>()
    const [globalState, setGlobalState] = useState({
        detailId: 0,
        openModal: false
    })

    console.log(params)


    useEffect(() => {
        const detailId = Object.values(params)[0]


        fetchUserDetail(detailId)
    }, [params])


    async function fetchUserDetail(detailId: string) {

        setGlobalState((prev: any) => ({...prev, detailId: detailId}))

        try {

            const response = await apiUserDetail(Number(detailId))
            const user: User = response.data
            setUserDetail(user)
        } catch (e) {

        }
    }

    async function handleSubmit() {
        try {
            const detailId = globalState.detailId
            const response = await apiDeleteUser(Number(detailId))

            const timeout = setTimeout(() => {
                alert(response.message)
                router.push('/users')
            }, 2000)

            return () => clearTimeout(timeout)

        } catch (e) {
        }
    }

    return <>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Detail Pengguna</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                    <div className="sm:col-span-8 mx-auto">
                    <DaisyUiAvatar className={"text-white rounded-full bg-white"}
                                   src={apiImageUrl(userDetail?.profile.photoUrl, 'users')}
                                   height={120} width={120}/>
                    </div>

                    <div className="sm:col-span-4">
                        <DaisyUiTextInput id={"name"} type={"text"} label={"Nama"}
                                          defaultValue={userDetail?.profile?.name}
                                          readOnly/>
                    </div>

                    <div className="sm:col-span-4">
                        <DaisyUiTextInput id={"email"} type={"text"} label={"Email"}
                                          defaultValue={userDetail?.email}
                                          readOnly/>
                    </div>

                    <div className="sm:col-span-4">
                        <DaisyUiTextInput id={"phone"} type={"text"} label={"Nomor HP"}
                                          defaultValue={userDetail?.profile?.phone!}
                                          readOnly/>
                    </div>

                    <div className="sm:col-span-4">
                        <DaisyUiTextInput id={"position"} type={"text"} label={"Jabatan"}
                                          defaultValue={userDetail?.position?.name}
                                          readOnly/>
                    </div>

                    <div className="sm:col-span-8 flex flex-row-reverse gap-4">
                        <DaisyUiButton text={"Edit User"}
                                       onClick={() => {
                                           router.push(`/users/${userDetail?.id}/edit`)
                                       }}/>
                        <DaisyUiButton text={"Hapus User"} className={"justify-end bg-red-500 hover:bg-red-400"}
                                       onClick={() => {
                                           setGlobalState((prev: any) => ({...prev, openModal: true}))
                                       }}/>
                    </div>


                    <DaisyUiModal isOpen={globalState.openModal}
                                  title={'Hapus User'}
                                  message={'Apakah anda yakin ingin melakukan menghapus user ini?'}
                                  options={{
                                      btnConfirm: {text: 'Hapus', className: 'bg-red-500 hover:bg-red-400'},
                                      btnClose: {text: 'Batal', className: 'bg-blue-500 hover:bg-base-400'}
                                  }}
                                  onConfirm={handleSubmit}
                                  onClose={() => {
                                      setGlobalState((prev: any) => ({...prev, openModal: false}))
                                  }}/>

                </div>

            </div>
        </div>
    </>
};