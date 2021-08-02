import express from "express";
import { App } from "../client/App.component";
// import { ChunkExtractor } from "@loadable/server";
import { ChunkExtractor } from "react-lazy-ssr/server";
import { resolve } from "path";
import React from "react";
import ReactDOMServer from "react-async-ssr";

// const primaryExtractor = () =>
//     new ChunkExtractor({
//         statsFile: resolve(__dirname + "../../../dist/loadable-stats.json"),
//         entrypoints: "bundle",
//         publicPath: "/dist/",
//     });
const primaryExtractor = () =>
    new ChunkExtractor({
        stats: require(__dirname + "../../../dist/reactLazySsrStats.json"),
        entryPoint: ["bundle"],
        publicPath: "/dist/",
    });
const app = express();

app.use("/dist", express.static(resolve(__dirname + "../../../dist/")));

app.use(async (_, res, next) => {
    const extractor = primaryExtractor();
    const jsx = extractor.collectChunks(<App />);
    const html = await ReactDOMServer.renderToStringAsync(jsx).catch((err) => {
        console.error(err);
        return "";
    });
    const scriptTags = extractor.getScriptTags();

    res.send(
        `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="app">${html}</div>
                ${scriptTags}
            </body>
        </html>`
    ).end();
    next();
});

app.listen(3000);
console.log("Listening on " + 3000);
