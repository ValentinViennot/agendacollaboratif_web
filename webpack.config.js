var webpack = require("webpack");

module.exports = {
    entry: {
        'polyfills': './app/polyfills.js',
        'vendor': './app/vendor.js',
        'application': './app/application.js'
    },
    output: {
        path: __dirname,
        filename: "./prod/[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['application', 'vendor', 'polyfills']
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {screw_ie8: true, keep_fnames: true},
            compress: {screw_ie8: true},
            comments: false
        })
    ]
};