export default {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    library: 'mockyeahFetch',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  }
};
