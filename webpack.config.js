const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./app/app.js', './app/styles.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    // Add sass-loader
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
     watch: true,
     devtool: 'source-map'
};
