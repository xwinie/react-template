var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer')


module.exports = {
    /*
     * 指定node_modules目录, 如果项目中存在多个node_modules时,这个很重要.
     * import js或者jsx文件时，可以忽略后缀名
     * */
    resolve: {
        modulesDirectories: ['node_modules', './node_modules'],
        extensions: ['', '.js', '.jsx'],
        unsafeCache: true,
        alias: {
            'components': path.resolve(__dirname, './src/js/components'),
            'common': path.resolve(__dirname, './src/js/common'),
            'actions': path.resolve(__dirname, './src/js/actions'),
            'reducers': path.resolve(__dirname, './src/js/reducers'),
            'constant': path.resolve(__dirname, './src/js/constant'),
            'containers': path.resolve(__dirname, './src/containers')
        }
    },
    resolveLoader: {
        modulesDirectories: ['node_modules', './node_modules']
    },
    historyApiFallback: true,
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
        './src/js/index.js'
    ],
    output: {
        path: __dirname + '/static',
        filename: "index_bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ["react-hot-loader", "babel-loader", "babel"]},
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|jpeg|gif)$/i, loader: 'url?name=[hash:8].[ext]&limit=8192'},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: __dirname + '/src/' + 'index.html',
            filename: 'index.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};