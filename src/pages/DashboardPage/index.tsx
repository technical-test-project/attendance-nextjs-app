import {DaisyUiButton} from "@/components/DaisyUi";
import React from "react";
import {useRouter} from "next/navigation";

const DashboardPage = () => {

    const router = useRouter()

    return (
        <>
            <div className="card card-compact lg:w-1/2 bg-base-300 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Welcome!</h2>
                    <p className="my-4">Tetap terhubung dengan kehadiran Anda. Selamat datang di dashboard aplikasi
                        Absensi kami!</p>
                    <div className="card-actions justify-end py-4">
                        <DaisyUiButton text="Absen Sekarang" onClick={() => router.push('/attendance')}/>
                    </div>
                </div>
            </div>

        </>);
};

export default DashboardPage;