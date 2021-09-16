const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "source-map",
  resolve: {
    // 定义别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    // 当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?/,
        loader: "ts-loader",
        options: {
          transpileOnly: true, //只编译不检查
          compilerOptions: {
            module: "es2015",
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 0,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 0,
            },
          },
          "less-loader",
        ],
      },
      // 处理图片类
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./static/favicon.ico",
    }),
  ],
  devServer: {
    open: false,
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: "/api",
        target: "http://127.0.0.1:5000",
      },
    ],
  },
};
