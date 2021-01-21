/*
  'postcss-px-to-viewport': {
    viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    unitToConvert: "px", // 要转化的单位
    viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
    fontViewportUnit: "vw",
    unitPrecision: 6, // 转换后的精度，即小数点位数
    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
    replace: true, // 是否转换后直接更换属性值,
    landscape: false, // 是否处理横屏情况
    propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换，当有些属性的单位不希望转换的时候，可以添加在数组后面，并在前面加上!号，如propList: ["*","!letter-spacing"],这表示：所有css属性的属性的单位都进行转化，除了letter-spacing的
    selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类名
    exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
  }
*/

const { isProduction } = require('./env')
const plugins = {}

if (isProduction) {
  /* css tree shaking S */
  // 安装包 yarn add @fullhuman/postcss-purgecss @fullhuman/vue-cli-plugin-purgecss -D
  // plugins['@fullhuman/postcss-purgecss'] = {
  //   content: ['./public/**/*.html', './src/**/*.vue'],
  //   defaultExtractor(content) {
  //     return (
  //       content
  //         .replace(/<style[^]+?<\/style>/gi, '')
  //         .match(/[\w-/:]*[\w-/]+/g) || []
  //     )
  //   },
  //   safelist: [
  //     /* vue S */
  //     /-(leave|enter|appear)(|-(to|from|active))$/,
  //     /^(?!(|.*?:)cursor-move).+-move$/,
  //     /^router-link(|-exact)-active$/,
  //     /data-v-.*/,
  //     /* vue E */
  //     /* loading S */
  //     /^g-loading.*/,
  //     /^g-spin.*/,
  //     /^g-spinner$/,
  //     /^g-poa-center$/,
  //     /^g-mask$/,
  //     /* loading E */
  //     /* message S */
  //     /^g-message.*/,
  //     /^g-fade-in-top$/,
  //     /* message E */
  //     /* antd S */
  //     /^ant-.*/,
  //     /^has-.*/,
  //     /^action.*/,
  //     /^svg.*/
  //     /* antd E */
  //   ]
  // }
  /* css tree shaking E */
}

module.exports = ({ parser, env, map, file }) => {
  // 使用 vant
  // const designWidth = file.dirname.includes(path.join('node_modules', 'vant'))
  //   ? 375
  //   : 750

  return {
    parser: parser ? 'sugarss' : false,
    map: env === 'development' ? map || 'inline' : false,
    plugins: {
      ...plugins /* ,

      // 适合移动端
      'postcss-plugin': env === 'production' ? {} : false,
      'postcss-px-to-viewport': { // vant 配置
        viewportWidth: designWidth,
        unitToConvert: "px",
        viewportUnit: "vw",
        fontViewportUnit: "vw",
        unitPrecision: 6,
        minPixelValue: 1,
        mediaQuery: true,
        landscape: false,
        propList: ["*"],
        selectorBlackList: [],
        exclude: []
      },
      'postcss-viewport-units': {
        // 排除会产生警告的部份
        filterRule: (rule) =>
          rule.nodes.findIndex((i) => i.prop === 'content') === -1
      } */
    }
  }
}
