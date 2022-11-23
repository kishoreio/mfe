const { merge } = require("webpack-merge");
const HTMlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const packageJSON = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN; // this is defined by CD/CI where says exactly where our prod application is hosted. We add the url in CD/CI

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJSON.dependencies,
    }),
    new HTMlWebpackPlugin({
      template: "./public/index.html",
    }), // Needed for host to run independently
  ],
};

module.exports = merge(commonConfig, prodConfig);
