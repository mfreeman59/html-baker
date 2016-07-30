module.exports = {
  context: __dirname + '/js',
  entry: {
    'main.bundle': './main',
  },
  output: {
    path: __dirname + '/dist/js',
    publicPath: '/dist/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query:{
          presets: ['es2015']
        }
      }
    ]
  }
};
