import React from "react";

interface DaisyUiButtonProps {
    text: string | undefined;
    type?: string;
    onClick?: () => void;
}

class DaisyUiButton extends React.Component<DaisyUiButtonProps> {
    render() {
        return <>
            <button
                type={this.props.type === "submit" ? "submit" : "button"}
                className={"btn btn-block bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"}
                onClick={this.props.onClick}
            >
                {this.props.text}
            </button>
        </>
    }
}

export default DaisyUiButton