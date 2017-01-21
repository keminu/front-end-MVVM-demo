var webpack = require('webpack')
module.exports = {
    entry: './temp.js',
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    // plugins: ['transform-runtime']
                }
            }
        ]
    }
}
