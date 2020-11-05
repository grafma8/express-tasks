const path = require("path");
require("dotenv").config({ path: "../.env" });

const MODE = process.env.NODE_ENV || "development"
const enableSourceMap = MODE === "development"

module.exports = {
  mode: MODE,
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../server/public/assets/js/"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: "ts-loader"
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false, sourceMap: enableSourceMap, importLoaders: 2 }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enableSourceMap
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: ["style-loader", { loader: "css-loader", options: { url: false, sourceMap: enableSourceMap } }]
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
        type: "asset/inline"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  target: ["web", "es5"],
  devtool: 'cheap-module-source-map'
}