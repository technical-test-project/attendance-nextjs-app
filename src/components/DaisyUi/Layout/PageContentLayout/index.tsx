import React from "react";
import {DaisyUiButton} from "@/components/DaisyUi";

interface Props {
    titlePage: string;
    children: React.ReactNode;
}

export default class Component extends React.Component<Props> {
    render() {
        return <>
            <div className="min-h-screen container mx-auto py-12 px-7 sm:px-6 lg:px-6 z-0">
                <h1 className="text-3xl font-bold mb-6"> {this.props.titlePage} </h1>

                {this.props.children}
            </div>
        </>;
    }
}

