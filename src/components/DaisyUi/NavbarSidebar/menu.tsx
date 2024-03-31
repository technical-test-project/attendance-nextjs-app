import React from "react";
import {ClipboardDocumentCheckIcon, HomeIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import StorageManager from "@/utils/storageManager";
import {useRouter} from "next/navigation";

interface Props {
    role: Role | null
}

export default function DaisyUiComponent(props: Props) {
    const router = useRouter()

    const role = props.role

    const menuList = [{
        roles: ['admin', 'employee'],
        icon: <HomeIcon className="grid text-white h-1/6 w-1/6 pointer-events-none"/>,
        label: 'Dashboard',
        url: '/'
    }, {
        roles: ['admin', 'employee'],
        icon: <ClipboardDocumentCheckIcon className="grid text-white h-1/6 w-1/6 pointer-events-none"/>,
        label: 'Absensi',
        url: '/attendance'
    }, {
        roles: ['admin'],
        icon: <UserGroupIcon className="grid text-white h-1/6 w-1/6 pointer-events-none"/>,
        label: 'User',
        url: '/users'
    }]

    const menuFilterByRole = menuList.filter((menu) => menu.roles.includes(role?.name!!))

    return <>
        <ul className="mx-auto">
            {menuFilterByRole.map((item, index) => (
                <li key={index} className="my-4 flex flex-row items-center" onClick={() => router.push(item.url)}>
                    {item.icon}
                    <span className="text-sm text-white mt-1">{item.label}</span>
                </li>))}
        </ul>
    </>
}