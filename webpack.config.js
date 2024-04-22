const path = require("path");
const webpack = require("webpack");
module.exports = {
    mode: "development",
    entry: "./view/index.js",
    output: {
        filename: "index.js",
        path: path.join(__dirname, "view/")
    }
};
