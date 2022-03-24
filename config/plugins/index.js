const plugins = []

// if(process.env.TARO_ENV === 'weapp') {
    plugins.push('taro-plugin-compiler-optimization')
// }

// path.join(process.cwd(), '/plugin-mv/index.js'),

module.exports = plugins