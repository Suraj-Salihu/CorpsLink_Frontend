const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const isProduction = env === 'production';
  
  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
      publicPath: '/'
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      port: 3000,
      hot: true,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
        '/socket.io': {
          target: 'http://localhost:5000',
          ws: true,
          changeOrigin: true,
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ]
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        inject: 'body',
      }),
      new Dotenv({
        path: isProduction ? './.env.production' : './.env.development',
        systemvars: true, // Load system environment variables
        defaults: './.env', // Load .env defaults
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};