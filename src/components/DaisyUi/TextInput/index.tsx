import React from "react";

interface Props {
    label: string
    type: string
    id: string
    placeholder: string
    required?: boolean
    onChange?: () => void
}

export default class Component extends React.Component<Props> {
    render() {
        return <>
            <div>
                <label htmlFor={this.props.id} className="block mb-1">{this.props.label}</label>
                <input
                    type={this.props.type}
                    id={this.props.id}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-white bg-transparent/20"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    required={this.props.required}
                />
            </div>
        </>;
    }
}

