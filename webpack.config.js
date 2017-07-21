module.exports = {
  entry: __dirname + '/js/teelaunch-scripts.dev.js',
  output: {
    path: __dirname + '/js',
    filename: 'teelaunch-scripts.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
