const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../extension/build/tab'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('web'),
        }),
    ],
};