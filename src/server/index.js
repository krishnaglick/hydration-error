require("regenerator-runtime/runtime");
require("@babel/register")({
    extensions: [".js", ".jsx"],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    // plugins: ["@babel/plugin-syntax-dynamic-import", "@loadable/babel-plugin"],
    plugins: ["@babel/plugin-syntax-dynamic-import", ["react-lazy-ssr/babel", { rootPath: __dirname }]],
});
require("./renderer");
