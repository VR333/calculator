const path = require('path');

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
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
     watch: true,
     devtool: 'source-map'
};
