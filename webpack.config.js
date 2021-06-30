const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'hi-request.min': './src/index.ts'
  },
  output: {
    filename: '[name].js',
    library: 'HiRequest',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [{ test: /\.ts$/, exclude: /node_modules/, use: ['ts-loader'] }]
  },
  //配置模块化引入文件的缺省类型
  resolve: {
    extensions: ['.js', '.ts']
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false,
        include: /\.min\.js$/
      })
    ]
  }
}
