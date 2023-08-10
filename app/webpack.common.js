const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
  // scriptLoading: 'defer'
  inject: "head",
  chunks: ["app"],
});

const upvPlugin = new HtmlWebPackPlugin({
  template: "./public/upv.html",
  filename: "./upv.html",
  // scriptLoading: 'defer'
  inject: "head",
  chunks: ["app"],
});

const porschePlugin = new HtmlWebPackPlugin({
  template: "./public/porsche.html",
  filename: "./porsche.html",
  // scriptLoading: 'defer'
  inject: "head",
  chunks: ["app"],
});

const pdfPlugin = new HtmlWebPackPlugin({
  template: "./public/pdf.html",
  filename: "./pdf.html",
  // scriptLoading: 'defer'
  inject: "head",
  chunks: ["app"],
});

const tMobilePlugin = new HtmlWebPackPlugin({
  template: "./public/tmobile.html",
  filename: "./tmobile.html",
  // scriptLoading: 'defer'
  inject: "head",
  chunks: ["app"],
});

module.exports = {
  entry: {
    app: "./src/main.js",
  },
  output: {
    filename: "client-bot.js?[hash]",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "window",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        use: [
          {
            // loader: 'file-loader',
            loader: "url-loader",
            // options: {
            // 	// TODO insert [hash]
            // 	name: 'assets/[name].[ext]',
            // 	publicPath: '/',
            // },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [htmlPlugin, upvPlugin, tMobilePlugin, porschePlugin, pdfPlugin],
};
