import React from "react";
import Link from "next/link";
import {ClipboardDocumentCheckIcon, HomeIcon} from "@heroicons/react/24/solid";


const menuList = [{
    icon: <HomeIcon className="grid text-white h-1/6 w-1/6 pointer-events-none"/>,
    label: 'Dashboard',
    url: '/dashboard'
}, {
    icon: <ClipboardDocumentCheckIcon className="grid text-white h-1/6 w-1/6 pointer-events-none"/>,
    label: 'Attendance',
    url: '/attendance'
},]

export default function DaisyUiComponent() {
    return <>
        <ul className="mx-auto">
            {menuList.map((item, index) => (<li key={index} className="my-4 flex flex-row items-center">
                {item.icon}
                <Link href={item.url} className={"grid"}>
                    <span className="text-sm text-white mt-1">{item.label}</span>
                </Link>
            </li>))}
        </ul>
    </>
}