import {DaisyUiButton, DaisyUiTable, DaisyUiTextInput} from "@/components/DaisyUi";
import React, {useEffect, useState} from "react";
import {apiUsers} from "@/api/users";
import {useParams, useSearchParams} from "next/navigation";


export default function UserDetailPage() {
    const params = useParams()
    console.log(params)

    useEffect(() => {
    }, [])


    const fetchUsers = async () => {

    }

    // console.log("data", data)

    const refreshPage = () => {

    }


    return <>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Detail Pengguna</h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                    <div className="sm:col-span-4">
                        <DaisyUiTextInput id={"password"} type={"password"} label={"Password"}
                                          required/>
                    </div>

                    <div className="sm:col-span-4">
                        <DaisyUiTextInput id={"passwordConfirmation"} type={"password"} label={"Konfirmasi Password"}
                                          required/>
                    </div>

                    <div className="sm:col-span-8 flex flex-row-reverse">
                        <DaisyUiButton text={"Update Password"} className={"justify-end"} type={"submit"}/>
                    </div>

                </div>

            </div>
        </div>
    </>
};