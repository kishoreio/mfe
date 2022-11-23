const { merge } = require("webpack-merge"); // merge functions allows to merge two different webpack config objects
const HTMlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJSON = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing", // declares a global variable when the script loads up in container
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap", // MarketingApp is distinct name out of exposes.
      },
      shared: packageJSON.dependencies,
    }),
    new HTMlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // devConfig will override any common property in common webpack config
