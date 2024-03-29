import React from "react";
import Image from "next/image";
import MenuList from "@/components/DaisyUi/NavbarSidebar/menu";

interface Props {
    children?: React.ReactNode
}


export default function DaisyUiComponent(props: Props) {
    return <>
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
                            <li><a>Profile</a></li>
                            <li className="text-red-500"><a>Logout</a></li>
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
                        <span className="grid text-sm mb-2">email@email.com</span>
                        <span className="grid text-xl">Admin</span>
                    </div>


                    <div className="divider"></div>

                    <MenuList/>

                </div>
            </div>
        </div>
    </>
}