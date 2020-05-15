const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
//require("file-loader?name=[name].[ext]!../index.html");

module.exports = {
  entry: ["./src/index.ts"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: "src/assets", to: path.resolve(__dirname, "dist/assets") },
      { from: "src/index.html", to: path.resolve(__dirname, "dist") },
    ]),
  ],
  mode: "development",
};
