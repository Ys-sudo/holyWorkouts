module.exports = {
  entry: {
 app: [
   'react-hot-loader/patch',
   'webpack/hot/only-dev-server',
   '/src/index.js'
 ],
},
    output: {
        path:__dirname+ '/dist/',
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        inline: false,
        contentBase: "./dist",
    },
    module: {
      loaders: [
        {
                test: /\.js$/,
                exclude:/node_modules/,        //exclude排除不使用loader的目录
                loader: "babel-loader"
            },
            {
                test: /\.css$/,        //判断是不是css文件
                loader:"style-loader!css-loader"    //必须写-loader，不能简写，否则报错
            }
        ]
    }

};
