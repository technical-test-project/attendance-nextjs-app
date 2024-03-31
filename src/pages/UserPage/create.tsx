import {DaisyUiAvatar, DaisyUiButton, DaisyUiModal, DaisyUiSelect, DaisyUiTextInput} from "@/components/DaisyUi";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {apiPositions, apiStoreUser} from "@/api/users";


export default function UserCreatePage() {
    const router = useRouter()
    const params = useParams()
    const [position, setPosition] = useState<Position[]>()
    const [positionMap, setPositionMap] = useState<{ id: number, value: string }[]>()
    const [globalState, setGlobalState] = useState({
        detailId: 0,
        openModal: false,
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
                formData.append('roleId', "2")
            }
            if (password) {
                formData.append('password', password)
            }
            if (positionId) {
                formData.append('positionId', positionId)
            }


            try {
                const response = await apiStoreUser(formData)

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
        }
    }

    // console.log(globalState)


    return <>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Tambah Pengguna</h2>


                <DaisyUiModal isOpen={globalState.openModal}
                              title={'Tambah User'}
                              message={'Apakah anda yakin ingin menambahkan user ini?'}
                              options={{
                                  btnConfirm: {text: 'Tambah'}, btnClose: {text: 'Batal'}
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
                                               src={null}
                                               height={45} width={45}/>

                                <DaisyUiTextInput id={"photo"} type={"file"} onChange={handleInput}/>
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"name"} type={"text"} label={"Nama"}
                                              required
                                              onChange={handleInput}/>
                        </div>

                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"email"} type={"text"} label={"Email"}
                                              required
                                              onChange={handleInput}/>
                        </div>


                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"phone"} type={"text"} label={"Nomor Hanphone"}
                                              inputMode={"numeric"}
                                              pattern={"[0-9]*"}
                                              required
                                              onChange={handleInput}
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <DaisyUiSelect id={"positionId"} items={positionMap} label={"Jabatan"}
                                           onChange={handleInput}/>
                        </div>

                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"password"} type={"password"} label={"Password"}
                                              onChange={handleInput}/>
                        </div>
                        <div className="sm:col-span-4">
                            <DaisyUiTextInput id={"passwordConfirmation"} type={"password"}
                                              label={"Konfirmasi Password"} onChange={handleInput}/>
                        </div>

                        <div className="sm:col-span-8 flex flex-row-reverse">
                            <DaisyUiButton text={"Tambah"} className={"justify-end"} type={"submit"}/>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    </>
};