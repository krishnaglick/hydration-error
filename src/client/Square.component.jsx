import React from "react";

let data = "";

const func = () =>
    new Promise((res) =>
        setTimeout(() => {
            data = "Square";
            res();
        }, 1000)
    );
const Square = () => {
    return (
        <React.Suspense fallback={<Fallback />}>
            <Loader func={func} />
        </React.Suspense>
    );
};

const SquareImpl = ({ data }) => {
    console.log(typeof window);
    // if (typeof window === "undefined") {
    //     return null;
    // }
    console.log({ data });
    return <div key="square">{data}</div>;
};

const Fallback = () => <div key="loading">Loading</div>;

const Loader = ({ func }) => {
    return (
        <React.Suspense fallback={<Fallback />}>
            <LoaderImpl func={func}>{(data) => console.log({ data }) || <SquareImpl data={data} />}</LoaderImpl>
        </React.Suspense>
    );
};

const LoaderImpl = ({ func }) => {
    if (data) {
        return <SquareImpl data={data} />;
    }
    throw func();
};

export default Square;
