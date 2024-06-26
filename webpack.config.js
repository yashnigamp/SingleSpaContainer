const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path")

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "dpure";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
  path: path.resolve(__dirname, 'public'), // Change 'dist' to 'public'
},
    plugins: [
      new ModuleFederationPlugin({
        name: "",
        remotes: {
          main: 'leftSidebar@https://single-spa-angular-child-app.vercel.app/remoteEntry.js'
        },
       
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
       
      }),
    ],
  },);
};
