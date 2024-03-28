import {useRouter} from "next/navigation";
import Image from "next/image";
import DaisyUiButton from "@/components/DaisyUi/Action/Button";
import DaisyUiTextInput from "@/components/DaisyUi/DataInput/TextInput";

const LoginPage = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mx-auto mb-3"
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Sign in to your
                        account</h2>
                </div>
                <form className="mt-8 space-y-6">
                    <DaisyUiTextInput label={"Email"} type={"text"} id={"email"} placeholder={"Enter your email"}
                           required/>
                    <DaisyUiTextInput label={"Password"} type={"password"} id={"password"} placeholder={"Your password"}
                           required/>

                    <div className={"pt-5"}>
                        <DaisyUiButton type={"button"} text={"Sign In"} onClick={() => router.push('/dashboard')}/>
                    </div>
                </form>
            </div>
        </div>);
};

export default LoginPage;