const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)   //path.join(__dirname) 设置绝对路径
}

module.exports = {
  publicPath: "/",
  assetsDir: "./dist",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/assets/style/variables.scss";`
      }
    }
  },
  configureWebpack: config => {
	config.performance = {
		maxEntrypointSize: 10000000,
		maxAssetSize: 30000000
	}
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('@views', resolve('./src/view'))
      .set('@assets', resolve('./src/assets'))
      .set('@utils', resolve('./src/utils'))
      .set('@components', resolve('./src/components'))
  }
};
