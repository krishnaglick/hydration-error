require("regenerator-runtime/runtime");
require("@babel/register")({
    extensions: [".js", ".jsx"],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [require("react-lazy-ssr/babel")],
});
require("./renderer");
