const path = require('path');

module.exports = {
  entry: {
    showCalcTHI: './src/showCalcTHI.ts',
    setCity: './src/setCity.ts',
    showCityResults: './src/showCityResults.ts',
    getWeatherInfo: './src/getWeatherInfo.ts',
    countTHIDays: './src/countTHIDays.ts',
    acquisitions: "./src/acquisitions.ts"
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
    path: path.resolve(__dirname, 'public/dist'),
    // clean: true
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    liveReload: true,
    compress: true,
    port: 9000,
  }
};