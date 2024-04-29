const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const FILE_LOADER = {
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'assets'
  }
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './typescript/index.ts',
    styles: './scss/index.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|webp)$/i,
        use: {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 70
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75
            }
          }
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|woff(2)?)$/,
        use: FILE_LOADER,
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: 'shared'
    }
  }
};
