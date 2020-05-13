//import webpack itself,commonjs syntax
const webpack = require("webpack");
//import path, which comes with Node, this will let us work with paths
const path = require("path");
//plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
//declare the Node environment,his is important for our Babel plugin so that it knows that we're running in development mode.
process.env.NODE_ENV = "development";

//To configure webpack, we export a JavaScript object.

module.exports = {
  //将模式设置为开发模式，一边webpack知道在开发模式下运行
  mode: "development",
  //我们选择目标，即网络。如果我们使用webpack来构建在Node中运行的应用程序，则可以将其设置为Node，这将改变webpack捆绑我们的代码的方式，以便Node可以使用它而不是浏览器。
  target: "web",
  //recommended for development so that we get a source map for debugging. Remember, source maps let us see our original code in the browser. Because we're going to transpile our code with Babel, source maps will let us see the original code that we wrote when we view it in the browser.
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  //webpack doesn't output code in development mode.It merely puts it in memory. However, we do have to declare these paths so that it knows where it's serving from memory.
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  //因为webpack在开发模式下不会输出代码。它只是将其存储在内存中。但是，我们必须声明这些路径，以便它可以从内存中知道它的服务位置。因此，我将在此处说path.resolve并使用提供当前目录名称的__dirname变量，然后在此处说“ build”。因此，尽管实际上并不会写文件来构建内存中的文件，但它将从该目录中进行服务。而公共道路我们将设置为一条斜线。此设置指定在浏览器中引用输出目录时的公共URL。我们将bundle的文件名设置为bundle.js。同样，将不会生成用于开发的物理文件，但是webpack需要此值，以便我们的HTML可以引用从内存提供的包。

  //use webpack to serve our app in development

  //You could choose to serve your app using any Node‑based web server such as Express too,
  devServer: {
    //This reduces the information that it writes to the command line so that we don't get a lot of noise when it's running.
    stats: "minimal",
    //this tells it to overlay any errors that occur in the browser.
    overlay: true,
    //this means that all requests will be sent to index.html. This way we can load deep links and they'll all be handled by React Router.
    historyApiFallback: true,
    //These last three lines are necessary due to an open issue in webpack when using the latest version of Chrome. Once it's resolved, we should be able to remove these.
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
  },
  //tell the plugin where to find our HTML and  favicon template, which is in the src directory
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  //我们告诉webpack我们想要它处理什么文件，我们通过声明一组规则来做到这一点
  module: {
    rules: [
      {
        //第一条规则将适用于我们的JavaScript，因此我们将告诉它如何查找我们的JavaScript文件。
        test: /\.(js|jsx)$/,
        //不需要这个文件
        exclude: /node_modules/,
        //我们希望在尚未配置的这些文件上运行Babel，我们将在下一个剪辑中进行操作。但是要在这些文件上运行Babel，我们将调用babel-loader。
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        //这次我们将使用两种不同的加载器，即样式加载器和css加载器。当我点击保存时，我们可以看到整个文件重新格式化，因为Prettier会自动重新格式化我们的代码。
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
