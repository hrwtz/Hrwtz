const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './app/app.module',
    './app/assets/sass/application.scss'
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader?-autoprefixer!postcss-loader',
          'sass-loader'
        ]
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix'
      }
    ]
  }
}