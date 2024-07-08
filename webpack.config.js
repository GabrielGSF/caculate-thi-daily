const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    showCalcTHI: './src/showCalcTHI.ts',
    setCity: './src/setCity.ts',
    showCityResults: './src/showCityResults.ts',
    getWeatherInfo: './src/getWeatherInfo.ts',
    countTHIDays: './src/countTHIDays.ts',
    chartTHI: "./src/chartTHI.ts",
    getPrecipitation: "./src/getPrecipitation.ts",
    chartPrecipitation: "./src/chartPrecipitation.ts",
    thiTable: "./src/thiTable.ts",
    precipitationTable: "./src/precipitationTable.ts"
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
    clean: true
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    liveReload: true,
    hot: false,
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({template: "public/index.html"})
  ] 
};