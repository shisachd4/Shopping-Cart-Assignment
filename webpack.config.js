const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/scripts/index.js',
  devServer: {
    static: './dist',
    hot: true
},
plugins: [
    new HtmlWebpackPlugin({
        template: './src/templates/home.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/templates/login.html',
        filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/templates/signUp.html',
        filename: 'signUp.html'
    }),
    new HtmlWebpackPlugin({
        template: './src/templates/plp.html',
        filename: 'plp.html'
    }),
    new CopyPlugin({
        patterns: [
            { from: "./static", to: "static" }
        ],
    }),
],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
};