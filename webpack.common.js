let path = require("path");
const src = path.join(__dirname, './src');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: src,
    entry: src + '/index.js',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Auto complete input with ReactJS',
            template: path.resolve(src, 'index.html'),
            filename: "index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ]
};