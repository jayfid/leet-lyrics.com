// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const cssLoaders = [
  isProduction ? MiniCssExtractPlugin.loader : "style-loader",
  "css-loader",
  "postcss-loader",
];

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new FaviconsWebpackPlugin({
      logo: "assets/logo.svg",
      outputPath: path.join(__dirname, "/dist/"),
      prefix: "",
      mode: isProduction ? "webapp" : "light",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: cssLoaders,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico|txt)$/i,
        type: "asset/resource",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
