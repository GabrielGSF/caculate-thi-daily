const path = require('path');

module.exports = {
  entry: {
    showCalcTHI: './src/showCalcTHI.ts',
    setCity: './src/setCity.ts',
    showCityResults: './src/showCityResults.ts',
    getWeatherInfo: './src/getWeatherInfo',
    countTHIDays: './src/countTHIDays'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  }
};