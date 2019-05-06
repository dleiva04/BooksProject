const path = require('path');
const htmlwebpackplugin = require('html-webpack-plugin');
const mini_css_extract_plugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV == 'development';

module.exports = {
     entry: './frontend/app.js',
     output: {
          path: path.join(__dirname, 'backend/public'),
          filename: 'js/bundle.js'
     },
     mode: 'production',
     module:{
          rules:[
               {
                    test: /\.css/,
                    use:[
                         devMode ? 'style-loader': mini_css_extract_plugin.loader,
                         'css-loader'
                    ]
               }
          ]
     },

     plugins:[
          new htmlwebpackplugin({
               template: './frontend/index.html',
               minify:{
                    collapseWhitespace:true,
                    removeComments:true,
                    removeRedundantAttributes:true,
                    removeScriptTypeAttributes:true,
                    removeStyleLinkTypeAttributes:true,
                    useShortDoctype:true
               }
          }),
          new mini_css_extract_plugin({
               filename: 'css/bundle.css'
          })
     ],
     devtool: 'source-map'
     
};