import React, { useEffect, useState } from "react";

let data = typeof window === "undefined" ? "" : "Square";
let counter = 0;

const func = () =>
    new Promise((res) =>
        setTimeout(() => {
            console.log({ counter });
            data = "Square" + counter++;
            res();
        }, 1000)
    );
const Square = () => {
    return <Loader func={func} />;
};

const SquareImpl = ({ data }) => {
    // This is to mock the server giving the client stale data that we don't want to show
    // And we then go get fresh data
    const [clientShow, updateClientShow] = useState(false);
    useEffect(() => {
        setTimeout(() => updateClientShow(true), 1000);
    }, []);
    if (typeof window !== "undefined" && !clientShow) {
        return null;
    }
    return (
        <div key="square">
            {data.split("").map((v, i) => (
                <div key={v + i}>{v}</div>
            ))}
        </div>
    );
};

const Fallback = () => <div key="loading">Loading</div>;

const Loader = ({ func }) => {
    return (
        <React.Suspense fallback={<Fallback />}>
            <LoaderImpl func={func}>{(data) => <SquareImpl data={data} />}</LoaderImpl>
        </React.Suspense>
    );
};

const LoaderImpl = ({ func, children }) => {
    if (data) {
        return children(data);
    }
    throw func();
};

export default Square;
