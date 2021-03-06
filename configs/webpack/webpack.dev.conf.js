const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
      progress: true,
    },
    open: true,
    hot: true,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
