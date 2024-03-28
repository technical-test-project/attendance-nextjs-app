import React from "react";

interface DaisyUiFooterProps {
    children?: React.ReactNode
}

class DaisyUiFooter extends React.Component<DaisyUiFooterProps> {
    render() {
        return <>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by Alvin</p>
                </aside>

                {this.props.children}

            </footer>
        </>
    }
}

export default DaisyUiFooter

