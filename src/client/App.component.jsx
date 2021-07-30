import React from "react";
import ReactDOM from "react-dom";
import lazy from "react-lazy-ssr";

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
    circle: lazy(() => import("./Circle.component")),
    square: lazy(() => import("./Square.component")),
    triangle: lazy(() => import("./Triangle.component")),
};

const Wrapper = ({ type }) => React.createElement(componentMap[type]);

export const App = () => {
    return (
        <>
            {data.map(({ type }, i) => (
                <React.Suspense fallback={<div>Loading</div>} key={type + i}>
                    <Wrapper type={type} key={type + i} />
                </React.Suspense>
            ))}
        </>
    );
};

if (typeof window !== "undefined") {
    lazy.preloadAll().then(() => ReactDOM.hydrate(<App />, document.getElementById("app")));
}
