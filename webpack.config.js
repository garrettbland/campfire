const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path')
const HtmlWebpackInjector = require('html-webpack-injector')
const purgecss = require('@fullhuman/postcss-purgecss')({
    // Specify the paths to all of the files with css styling
    content: [__dirname + '/src/**/*.js'],

    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) =>
        content.match(/[\w-/.:]+(?<!:)/g) || [],
})

module.exports = (env, options) => {
    console.log(`✅ Running webpack in ${options.mode} mode`)
    return {
        context: __dirname + '/src', // `__dirname` is root of project and `/src` is source
        entry: {
            index: './index.js',
            index_head: './index_head.js',
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
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                // '@babel/preset-react',
                            ],
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
                filename: `style.css`,
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: './index.html',
                hash: true,
                chunks: ['index', 'index_head'],
                chunksConfig: {
                    // Added option
                    async: ['index_head'],
                    async: ['index'],
                },
            }),
            new HtmlWebpackInjector(),
            // new CopyWebpackPlugin([
            //     {
            //         from: __dirname + '/src/public',
            //         to: __dirname + '/dist/public',
            //     },
            // ]),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            historyApiFallback: true,
        },
    }
}

// module.exports = config
