const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
const HtmlWebpackInjector = require('html-webpack-injector')

const purgecss = require('@fullhuman/postcss-purgecss')({
    /**
     * Specifiy the path of the files to inspect
     */
    content: [__dirname + '/src/**/*.js'],

    /**
     * Include any special characters you're using in this regular expression
     * This is recommended from tailwind docs
     */
    defaultExtractor: (content) =>
        content.match(/[\w-/.:]+(?<!:)/g) || [],
})

module.exports = (env, options) => {
    console.log(`✅ Running webpack in ${options.mode} mode`)
    return {
        context: __dirname + '/src',
        entry: {
            /**
             * Define a index and index_head
             * HTMLWebpackInjector injects index_head to <head>, and appends index script to body
             */
            app: './app.js',
            vendor: './vendor/vendor.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: '[name].bundle.js',
            publicPath: '/',
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
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                    ...(options.mode === 'production'
                                        ? [purgecss]
                                        : []),
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './vendor/style.css',
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: './index.html',
                /**
                 * Hash adds ?[hash] to file name for cache busting
                 */
                hash: true,
                chunks: ['app', 'vendor'],
                chunksConfig: {
                    defer: ['app'],
                    defer: ['vendor'],
                },
            }),
            new HtmlWebpackInjector(),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            historyApiFallback: true,
        },
    }
}
