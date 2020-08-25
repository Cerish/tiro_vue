let proxyObj = {};
proxyObj['/ws'] = {
    ws: true,
    target: "ws://localhost:8090"
};
proxyObj['/api'] = {
    ws: false,
    target: 'http://localhost:8090',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    devServer: {
        host: "0.0.0.0",
        port: 8888,
        proxy: proxyObj
    },
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
            .set('components',resolve('src/components'))
            .set('layout',resolve('src/layout'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
    },
    pwa: {
        iconPaths: {
            favicon32: 'tiro.ico',
            favicon16: 'tiro.ico',
            appleTouchIcon: 'tiro.ico',
            maskIcon: 'tiro.ico',
            msTileImage: 'tiro.ico'
        }
    }
}