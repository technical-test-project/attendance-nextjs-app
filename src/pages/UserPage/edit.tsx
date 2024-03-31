import {DaisyUiAvatar, DaisyUiButton, DaisyUiModal, DaisyUiSelect, DaisyUiTextInput} from "@/components/DaisyUi";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {apiImageUrl, apiPositions, apiUpdateUser, apiUserDetail} from "@/api/users";
import Helpers from "@/utils/helpers";


export default function UserEditPage() {
    const router = useRouter()
    const params = useParams<{id: string}>()
    const [userDetail, setUserDetail] = useState<User>()
    const [positionMap, setPositionMap] = useState<{ id: number, value: string }[]>()
    const [globalState, setGlobalState] = useState({
        detailId: 0,
        openModal: false,
        withPassword: false,
        photoFile: null,
        name: null,
        email: null,
        phone: null,
        password: null,
        positionId: null,
        passwordConfirmation: null,
    })


    useEffect(() => {
        const detailId = Object.values(params)[0]

        fetchUserDetail(detailId)
        fetchPositions()
    }, [params])


    async function fetchPositions() {
        try {
            const response = await apiPositions()
            const positions: Position[] = response.data
            const map: { id: number, value: string }[] = positions.map((item) => ({
                id: item.id, value: item.name
            }))
            setPosition(positions)
            setPositionMap(map)
        } catch (e) {
        }
    }

    async function fetchUserDetail(detailId: string) {

        setGlobalState((prev: any) => ({...prev, detailId: detailId}))

        try {
            const response = await apiUserDetail(Number(detailId))
            const user: User = response.data
            setUserDetail(user)
        } catch (e) {
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
        try {
            const detailId = globalState.detailId

            const {photoFile, name, email, phone, password, positionId} = globalState
            const formData = new FormData()
            // Mix with UserId becuz error and api update user
            formData.append('userId', detailId)
            if (photoFile) {
                formData.append('photo', photoFile)
            }
            if (name) {
                formData.append('name', name)
            }
            if (phone) {
                formData.append('phone', phone)
            }
            if (email) {
                formData.append('email', email)
            }
            if (password) {
                formData.append('password', password)
            }
            if (positionId) {
                formData.append('positionId', positionId)
            }

            try {
                const response = await apiUpdateUser(Number(detailId), formData)

                const timeout = setTimeout(() => {
                    if (response.data) {
                        setGlobalState((prev: any) => ({
                            ...prev, openModal: false, photoFile: null,
                        }))

                        alert(response.message)
                        router.push('/users/' + detailId)
                    }
                }, 1000)
                return () => clearTimeout(timeout)
            } catch (e) {
                setGlobalState((prev: any) => ({
                    ...prev, openModal: false, photoFile: null,
                }))
                console.log(e)
            }


        } catch (e) {
            alert(e?.message)
        }
    }

    // console.log(globalState)


    return <>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Edit Pengguna</h2>


                <DaisyUiModal isOpen={globalState.openModal}
                              title={'Update User'}
                              message={'Apakah anda yakin ingin melakukan update pada user ini?'}
                              options={{
                                  btnConfirm: {text: 'Update'}, btnClose: {text: 'Batal'}
                              }}
                              onConfirm={handleSubmit}
                              onClose={() => {
                                  setGlobalState((prev: any) => ({...prev, openModal: false}))
                              }}/>


                <form method="post" onSubmit={(e: any) => {
                    e.preventDefault()
                    setGlobalState((prev: any) => ({
                        ...prev, openModal: true
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
                                               src={apiImageUrl(userDetail?.profile.photoUrl, 'users')}
                                               height={45} width={45}/>

                                <DaisyUiTextInput id={"photo"} type={"file"} onChange={handleInput}/>
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"name"} type={"text"} label={"Nama"}
                                              defaultValue={Helpers.ucWords(userDetail?.profile.name ?? '-')} required
                                              onChange={handleInput}/>
                        </div>

                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"email"} type={"text"} label={"Email"}
                                              defaultValue={userDetail?.email} required
                                              onChange={handleInput}/>
                        </div>


                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"phone"} type={"text"} label={"Nomor Hanphone"}
                                              defaultValue={Helpers.formatPhoneNumber(userDetail?.profile?.phone ?? '')}
                                              inputMode={"numeric"}
                                              pattern={"[0-9]*"}
                                              required
                                              onChange={handleInput}
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <DaisyUiSelect id={"positionId"} items={positionMap} label={"Jabatan"}
                                           defaultValue={userDetail?.position?.id}
                                           onChange={handleInput}/>
                        </div>

                        <div className="sm:col-span-8 flex flex-row">
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox" onChange={() => {
                                        setGlobalState((prev: any) => ({
                                            ...prev, withPassword: !globalState.withPassword
                                        }))
                                    }}/>
                                    <span className="label-text mx-4">Update Dengan Password</span>
                                </label>
                            </div>
                        </div>

                        {globalState.withPassword ? <>
                            <div className="sm:col-span-4">
                                <DaisyUiTextInput id={"password"} type={"password"} label={"Password"}
                                                  onChange={handleInput}/>
                            </div>
                            <div className="sm:col-span-4">
                                <DaisyUiTextInput id={"passwordConfirmation"} type={"password"}
                                                  label={"Konfirmasi Password"} onChange={handleInput}/>
                            </div>
                        </> : null}


                        <div className="sm:col-span-8 flex flex-row-reverse">
                            <DaisyUiButton text={"Update"} className={"justify-end"} type={"submit"}/>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    </>
};