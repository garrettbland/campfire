const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
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
            app: './index.js',
        },
        output: {
            path: __dirname + '/dist',
            filename: `[name].[hash].js`, // bundle created by webpack it will contain all our app logic. we will link to this .js file from our html page.
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
                                '@babel/preset-react',
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
                filename: `[name].[hash].css`,
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: './index.html',
            }),
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
