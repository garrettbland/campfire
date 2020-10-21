const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, options) => {
    console.log(`✅ Running webpack in ${options.mode} mode`)
    return {
        entry: {
            main: path.resolve(__dirname, './src/index.js'),
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[contenthash].js',
        },
        optimization: {
            minimize: options.mode === 'production' ? true : false,
            minimizer: [
                new TerserJSPlugin({}),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './[name].css',
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(
                    __dirname,
                    './src/template.html'
                ), // template file
                filename: 'index.html', // output file
                hash: true, // adds ?hash to cache bust
            }),
            new CopyPlugin({
                patterns: [
                    { from: path.resolve(__dirname, 'public') },
                ],
            }),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, './dist'),
            open: true,
            compress: true,
            watchContentBase: true,
            port: 8080,
        },
    }
}
