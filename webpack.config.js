const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
            {test: /\.scss$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'My webpack project',
          template: PATHS.src + '/template.html'
        }),
        new ExtractTextPlugin("app.css")
      ]
}