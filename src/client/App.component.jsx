import React from "react";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";

const data = [
    {
        type: "circle",
    },
    {
        type: "square",
    },
    {
        type: "triangle",
    },
    {
        type: "square",
    },
];

const componentMap = {
    circle: loadable(() => import("./Circle.component")),
    square: loadable(() => import("./Square.component")),
    triangle: loadable(() => import("./Triangle.component")),
};

const Wrapper = ({ type }) => React.createElement(componentMap[type]);

export const App = () => {
    return (
        <>
            {data.map(({ type }, i) => (
                <Wrapper type={type} key={type + i} />
            ))}
        </>
    );
};

if (typeof window !== "undefined") {
    const { loadableReady } = require("@loadable/component");
    loadableReady(() => {
        ReactDOM.hydrate(<App />, document.getElementById("app"));
    });
}
