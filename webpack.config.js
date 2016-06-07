/* webpack.config.js */
var path = require('path');
var webpack = require('webpack');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

// 引用这个plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pathToReact = path.join(__dirname, "./node_modules/react/dist/react.js");
var pathToReactDOM = path.join(__dirname, "./node_modules/react-dom/dist/react-dom.js");
//user.json
function rewriteUrl(replacePath) {
    return function (req, opt) {
        var queryIndex = req.url.indexOf('?');//取得问号的索引
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";//得到查询字符串
        console.log("opt.path ", opt.path);
        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log("rewriting ", req.originalUrl, req.url);
    };
}
module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        publicPath: "/static/",
        path: path.resolve(__dirname, "build"),

        filename: "bundle.js"
    },
    devServer: {
        publicPath: "/static/",
        stats: {colors: true},
        port: 8080,
        hot: true,
        contentBase: 'build',
        inline: true,
        proxy: [
            {
                path: /^\/api\/(.*)/,
                target: "http://localhost:8080/",
                rewrite: rewriteUrl('/$1\.json'),
                changeOrigin: true
            }
        ]
    },

    resolve: {
        extensions: ["", ".js", ".jsx", ".css", ".json"],
        alias: {
            'react': pathToReact,
            'react-dom': pathToReactDOM
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // 使用这个plugin，这是最简单的一个配置，更多资料可到github查看
        new HtmlWebpackPlugin({
            title: 'zhufeng-react',
            template: './src/index.html',
        }),
        new openBrowserWebpackPlugin({ url: 'http://localhost:8080' })
    ],
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                test: /\.css/,
                loader: 'style!css'
            },
            {
                test: /\.less/,
                loader: 'style!css!less'
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000"
            }
        ],
        noParse: [pathToReact, pathToReactDOM]
    }
};