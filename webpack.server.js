//webpack.server.js配置
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const serverConfig = {
    target:'node',
    mode:'development',
    entry:'./app.js',
    output: {
        filename:'bundle.js',
        path:path.resolve(__dirname,'build')
    },
    externals: [nodeExternals()],
}

module.exports = merge(config,serverConfig)