import React from "react";

interface Props {
    children?: React.ReactNode
}

export default function DaisyUiComponent(props: Props) {
    return <>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <aside>
                <p>Copyright © 2024 - All right reserved by Alvin</p>
            </aside>

            {props.children}

        </footer>
    </>
}



