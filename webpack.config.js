const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
})
let cssConfig = isProd ? cssProd : cssDev;

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

module.exports = {
    entry: PATHS.src + '/app.js',
    output: {
        path: PATHS.dist,
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {test: /\.scss$/, use: cssConfig}
        ]
    },
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        stats: 'errors-only',
        open: true,
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
          title: 'My webpack project',
          template: PATHS.src + '/template.html'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: !isProd
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ]
}