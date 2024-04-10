const path = require('path');

module.exports = {
  externals: {},
  mode: 'development',
  optimization: {
    removeAvailableModules: true,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  performance: {
    hints: false,
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  stats: 'normal',
};
