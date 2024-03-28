import React from "react";

interface Props {
    theme?: string
    children: React.ReactNode
}

export default class Component extends React.Component<Props> {
    render() {
        return (
            <main data-theme={this.props.theme ?? "dim"}>
                {this.props.children}
            </main>
        )
    }
}
