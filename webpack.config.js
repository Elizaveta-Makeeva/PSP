const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'index.html', to: 'index.html' },
        { from: 'static', to: 'static' },
        { 
          from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
          to: 'static/css/bootstrap.min.css'
        },
        {
          from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
          to: 'static/js/bootstrap.bundle.min.js'
        }
      ]
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, ''),
      'node_modules'
    ]
  }
};