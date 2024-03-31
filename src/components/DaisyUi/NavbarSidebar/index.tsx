import React, {useEffect, useState} from "react";
import Image from "next/image";
import MenuList from "@/components/DaisyUi/NavbarSidebar/menu";
import {useRouter} from "next/navigation";
import {DaisyUiModal} from "@/components/DaisyUi";
import StorageManager from "@/utils/storageManager";
import {apiProfile} from "@/api/users";

interface Props {
    children?: React.ReactNode
}


export default function DaisyUiComponent(props: Props) {
    const router = useRouter()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [user, setUser] = useState<User | null>(null)


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

    async function handleLogout() {
        try {
            const timeout = setTimeout(() => {
                router.push('/login')
                StorageManager.clearStorage()
            }, 1000)

            return () => clearTimeout(timeout)

        } catch (e) {
            console.log(e)
        }
    }


    return <>
        <DaisyUiModal isOpen={isOpenModal}
                      title={'Logout'}
                      message={'Apakah anda yakin ingin mengakhiri sesi ini?'}
                      options={{
                          btnConfirm: {text: 'Logout', className: 'bg-red-500 hover:bg-red-400'},
                          btnClose: {text: 'Batal', className: 'bg-blue-500 hover:bg-base-400'}
                      }}
                      onConfirm={() => {
                          handleLogout()
                      }}
                      onClose={() => {
                          setIsOpenModal(false)
                      }}/>

        {/* NavbarSidebar */}
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar"
                               className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold">Attendance Next App</div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component"
                                     src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                            </div>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-300 rounded-box w-40 gap-1">
                            <li><a onClick={() => router.push('/profile')}>Profile</a></li>

                            <li className="text-red-500">
                                <a onClick={() => {
                                    setIsOpenModal(true)
                                }}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Drawer */}
            <div className="drawer-side z-10">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu menu-sm flex flex-col items-center p-4 max-w-80 min-h-full bg-base-200 z-0">
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mx-auto mb-7 mt-5"
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={100}
                        height={20}
                        priority
                    />

                    <div className="avatar online placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-24">
                            <span className="text-3xl">A</span>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4 text-center">
                        <span className="grid text-sm mb-2">{user?.email}</span>
                        <span className="grid text-xl">{user?.role?.name}</span>
                    </div>


                    <div className="divider"></div>

                    <MenuList role={user?.role!}/>

                </div>
            </div>
        </div>
    </>
}