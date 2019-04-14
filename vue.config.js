module.exports = {
    publicPath: '/',
    devServer: {
        port: 3001,
        open: true,
        host: 'localhost',
        https: false,
        proxy: 'http://localhost:3002'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': '@/assets',
                '@components': '@/components',
                '@pages': '@/pages',
                '@styles': '@/styles',
                '@types': '@/store/types',
                '@utils': '@/utils'
            }
        }
    }
}