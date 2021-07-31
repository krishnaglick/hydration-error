const LoadablePlugin = require("@loadable/webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        bundle: "./src/client/App.component.jsx",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.m?js$/,
                include: /node_modules/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".mjs", "json"],
    },
    output: {
        path: path.resolve("./dist"),
        filename: "[name].[contenthash].js",
        clean: true,
    },
    plugins: [new LoadablePlugin({ writeToDisk: true })],
};
