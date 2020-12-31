const path = require('path')
const fs = require('fs')

const { isProduction, worker, ui } = require('./env')

const { ContextReplacementPlugin, DllReferencePlugin } = require('webpack')
const { merge } = require('webpack-merge')
const tsImportPluginFactory = require('ts-import-plugin')

// const LodashWebpackPlugin = require('lodash-webpack-plugin')

// 测量打包各环节耗费时间
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

/* 提升构建速度 S */
// 用于缓存 webpack 内部模块处理的中间结果，提升二次模块转换速度
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
/* 提升构建速度 E */

/* gzip S */
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 还可以开启比 gzip 体验更好的 Zopfli
const zopfli = require('@gfx/zopfli')
const BrotliPlugin = require('brotli-webpack-plugin')

// 需要gzip压缩的文件后缀
const productionGzipExtensions = [
  'ts',
  'js',
  'css',
  'json',
  'txt',
  'html',
  'ico',
  'svg'
]
const productionGzipReg = new RegExp(
  '\\.(' + productionGzipExtensions.join('|') + ')$',
  'i'
)
/* gzip E */

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

/* CDN S */
// 忽略要打包的模块，根据项目的需要来添加
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'axios',
  qs: 'Qs'
  // 'aws-sdk': 'AWS'
  // moment: 'moment'
  // 'ant-design-vue': 'antd'

  // 'element-ui': 'ELEMENT',
  // 'vue-lazyload': 'VueLazyload',
  // clipboard: 'ClipboardJS',
  // echarts: 'echarts'
  // 'tinymce/tinymce': 'tinymce'
}

// 根据 externals 要忽略打包的模块，手动引入对应模块 cdn => 注意：指定版本 以及 模块加载顺序（是否依赖于前者，例如 Vue）
// 访问 https://www.bootcdn.cn/ 获取最新版本
const cdn = {
  css: [
    // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css',
    // 'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.6.3/antd.min.css'
  ],
  js: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/qs/6.9.4/qs.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/aws-sdk/2.0.0/aws-sdk.min.js',
    // 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.27.0/moment.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.6.5/antd.min.js',
    // 'https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.6.5/antd-with-locales.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/moment.js/2.27.0/locale/zh-cn.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
    // 'https://cdn.bootcdn.net/ajax/libs/vue-lazyload/1.3.3/vue-lazyload.js',
    // 'https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.6/clipboard.min.js',
    // 'https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js'
    // 'https://cdn.bootcdn.net/ajax/libs/tinymce/5.4.0/tinymce.min.js'
  ]
}
/* CND E */

// in the development, use own LAN ip to running or debug
const getLANIp = () => {
  const interfaces = require('os').networkInterfaces()

  for (const devName in interfaces) {
    const interface = interfaces[devName]

    for (let i = 0, len = interface.length; i < len; i++) {
      const item = interface[i]

      if (
        item.family === 'IPv4' &&
        item.address !== '127.0.0.1' &&
        !item.internal
      ) {
        return item.address
      }
    }
  }

  // 找不到使用本地测试 ip
  return '127.0.0.1'
}

// 获取输入目录的绝对路径
const resolve = directory => path.resolve(__dirname, directory)

// 为每个 .vue 文件引入公共样式
const addStyleResource = rule => {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // resolve('./src/assets/sass/variables.sass'),
        resolve('./src/assets/sass/architecture/mixin/g_placeholder.sass'),
        resolve('./src/assets/sass/architecture/mixin/g_lineEllipsis.sass')
      ]
    })
}

const getTsImportPluginFactories = ui => {
  const config = {
    'element-ui': () => {
      const join = path.join
      const basename = path.basename
      const camel2Dash = require('camel-2-dash')

      return {
        libraryName: 'element-ui',
        libraryDirectory: 'lib',
        camel2DashComponentName: true,
        style: path =>
          join(
            'element-ui',
            'lib',
            'theme-chalk',
            `${camel2Dash(basename(path, '.js'))}.css`
          )
      }
    },
    vant: () => {
      return {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }
    },
    'ant-design-vue': () => {
      return {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: 'css'
      }
    }
  }
  let result = []

  if (typeof ui === 'string') {
    result.push(tsImportPluginFactory(config[ui]()))
  } else if (Array.isArray(ui)) {
    result = ui.map(item => tsImportPluginFactory(config[item]()))
  }

  return result
}

const demandImportLibrary = config => {
  config.module
    .rule('ts')
    .use('ts-loader')
    .tap(options => {
      options = merge(options, {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [...getTsImportPluginFactories(ui)]
        }),
        compilerOptions: {
          module: 'es2015'
        }
      })
      return options
    })
}

const appendWorkerLoader = config => {
  // 添加 worker-loader 支持
  config.module
    .rule('worker')
    .post()
    .test(/\.worker\.(j|t)s$/)
    .use('worker')
    .loader('worker-loader')
    .options({
      inline: 'fallback',
      filename: '[name]:[hash:8]', // 打包后chunk的名称
      publicPath: process.env.BASE_URL
    })
    .end()

  // window is undefined，这个是因为worker线程中不存在window对象，因此不能直接使用，要用this代替
  config.output.globalObject('this')
}

const appendAlias = config => {
  // 内部已经有此扩展
  // const extensions = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.json']
  // extensions.forEach(extension => config.resolve.extensions.prepend(extension))

  const tsconfig = fs.readFileSync('./tsconfig.json')
  const tsconfigAlias = JSON.parse(
    // 去除注释
    tsconfig.toString().replace(/\/\/.*(\r|\n|\r\n)/g, '')
  ).compilerOptions.paths

  Object.keys(tsconfigAlias).forEach(alias => {
    config.resolve.alias.set(
      alias.replace('/*', ''),
      resolve(tsconfigAlias[alias][0].replace('/*', ''))
    )
  })

  const otherAlias = {
    '@ant-design/icons/lib/dist$': './src/register/antd/icons.ts'
  }
  Object.keys(otherAlias).forEach(name =>
    config.resolve.alias.set(name, resolve(otherAlias[name]))
  )
}

const appendCommonStyle = config => {
  // 添加 公共样式文件 到 每个组件
  const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  types.forEach(type =>
    addStyleResource(config.module.rule('sass').oneOf(type))
  )
}

const removeTagSpace = config => {
  // 模版中 HTML 标签之间的空格将会被忽略
  config.module
    .rule('vue')
    .use('vue-loader')
    .loader('vue-loader')
    .tap(options => {
      options.compilerOptions.preserveWhitespace = false
      return options
    })
    .end()
}

const handleHtmlWebpackPlugin = config => {
  // 传递给 html-webpack-plugin 构造函数的新参数，在 public/index.html 中使用
  config.plugin('html').tap(args => {
    // args[0].title = '你想设置的title名字'

    // 修复 Lazy loading routes Error
    args[0].chunksSortMode = 'none'

    // 手动注入 cdn
    args[0].cdn = isProduction ? cdn : { css: cdn.css }

    return args
  })
}

const handleChunk = config => {
  config.optimization.splitChunks({
    // async异步代码分割 initial同步代码分割 all同步异步分割都开启
    chunks: 'all',
    // 字节 引入的文件大于30kb才进行分割
    minSize: 30000,
    // 尝试将大于50kb的文件拆分成n个50kb的文件
    // maxSize: 50000,
    // 模块至少使用次数
    minChunks: 1,
    // 同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
    maxAsyncRequests: 5,
    // 首页加载的时候引入的文件最多3个
    maxInitialRequests: 3,
    // 缓存组和生成文件名称之间的连接符
    automaticNameDelimiter: '~',
    // 缓存组里面的filename生效，覆盖默认命名
    name: true,
    cacheGroups: {
      //缓存组，将所有加载模块放在缓存里面一起分割打包
      vendors: {
        name: 'chunk-vendors',
        chunks: 'initial',
        // 提升权重，先抽离第三方模块，再抽离公共模块，要不然执行抽离公共模块就截止不会往下执行
        priority: 100,
        test: /[\\/]node_modules[\\/]/
      },
      common: {
        name: 'chunk-common',
        chunks: 'all',
        priority: 10,
        // 文件最小字节
        minSize: 0,
        // 引用次数
        minChunks: 2,
        //模块嵌套引入时，判断是否复用已经被打包的模块
        reuseExistingChunk: true
      },
      styles: {
        name: 'styles',
        test: /\.(sa|sc|c)ss$/,
        chunks: 'all',
        enforce: true
      }
    }
  })

  /**
   * 将包含chunks 映射关系的 list单独从 app.js里提取出来，
   * 因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
   * 所以你每次改动都会影响它，如果不将它提取出来的话，
   * 等于app.js每次都会改变。缓存就失效了
   */
  config.optimization.runtimeChunk = {
    name: entrypoint => `manifest.${entrypoint.name}`
  }
}

const compressImg = config => {
  // 清除已有的所有 loader，如果不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。可能导致压缩生成的 base64 是错误的
  config.module.rule('svg').uses.clear()

  // 压缩图片，不加选项，图片压缩质量可用，加了压缩就模糊（可能比率没调对）
  config.module
    .rule('images')
    .test(/\.(gif|png|jpe?g|svg)$/i)
    .use('image-webpack-loader')
    .loader('image-webpack-loader')
  /* .options({
    mozjpeg: { progressive: true, quality: 65 },
    optipng: { enabled: false },
    pngquant: { quality: [0.65, 0.9], speed: 4 },
    gifsicle: { interlaced: false },
    webp: { quality: 75 }
  }) */
}

const packageAnalyz = config => {
  config.plugin('webpack-freport').use(BundleAnalyzerPlugin, [
    {
      //  可以是`server`，`static`或`disabled`。
      //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
      //  在“静态”模式下，会生成带有报告的单个HTML文件。
      //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
      analyzerMode: 'static'
    }
  ])
}

const getDevelopmentPlugins = () => {
  return [
    // 缓存加速二次构建速度
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      { test: /mini-css-extract-plugin[\\/]dist[\\/]loader/ }
    ]),
    new DllReferencePlugin({
      context: process.cwd(),
      manifest: require('./vendor/vendor-manifest.json')
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: resolve('vendor/*.js'),
      // dll 引用路径
      publicPath: `/${process.env.ASSETS_DIR}/js/vendor`,
      // dll最终输出的目录
      outputPath: `${process.env.ASSETS_DIR}/js/vendor`
    })
  ]
}
const getProductionPlugins = () => {
  return [
    // 注意：这个插件在使用 find 等方法时可能会删除一些必要的依赖，导致程序报错，解决方法是自己补全依赖，或者换用 lodash-es
    // 无法合理移除掉 ant-design-vue 中无效的内容，移除后报错 t is not a function，暂未找到合适的解决方案
    // new LodashWebpackPlugin(),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/),
    // 开启 Gzip 压缩
    new CompressionWebpackPlugin({
      // 目标资源文件名称
      filename: '[path].gz[query]',
      // 压缩算法
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback)
      },
      compressionOptions: {
        numiterations: 15
      },
      // 匹配所有对应的文件
      test: productionGzipReg,
      // 只处理比这个值大的资源。按字节计算
      threshold: 10240,
      // 只有压缩率比这个值小的资源才会被处理（minRatio = 压缩大小 / 原始大小
      minRatio: 0.8,
      // 是否删除原始资源
      deleteOriginalAssets: false
    }),
    new BrotliPlugin({
      test: productionGzipReg,
      minRatio: 0.99
    })
  ]
}

module.exports = {
  // 默认 '/'，部署应用包后访问资源的基本 URL
  publicPath: process.env.BASE_URL,

  // 默认 'dist', 生产环境构建文件的目录
  outputDir: process.env.OUTPUT_DIR,

  // 相对于outputDir的静态资源(js、css、img、fonts)目录
  assetsDir: process.env.ASSETS_DIR,

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: './',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 页面模式，undefined 单页，object 多页
  pages: undefined,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: !isProduction,
  // lintOnSave: false,

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],

  // 生产环境的 source map
  productionSourceMap: false,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: undefined,

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,

  //是否为 Babel 或 TypeScript 使用 thread-loader。
  // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  // 使用 web worker 时需要关闭并行编译
  parallel: worker ? false : require('os').cpus().length > 1,

  css: {
    /**
     * 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
     * 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
     * 如果你在 css.loaderOptions.css 里配置了自定义的 CSS Module 选项，
     * 则 css.requireModuleExtension 必须被显式地指定为 true 或者 false，
     * 否则我们无法确定你是否希望将这些自定义配置应用到所有 CSS 文件中
     */
    requireModuleExtension: true,

    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    // extract: isProduction,

    // 开启 CSS source maps，一般不建议开启
    // sourceMap: isProduction,

    // css预设器配置项
    loaderOptions: {
      // 这里的选项会传递给 css-loader
      /* css: {
        modules: {
          localIdentName: '[name]-[hash]'
        },
        localsConvention: 'asIs'
      }, */
      // 这里的选项会传递给 sass-loader
      sass: {
        // sourceMap: isProduction
        // prependData: `@import "@/assets/sass/component.sass"`
      }
      /* less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#06F'
          },
          javascriptEnabled: true
        }
      } */
      // 这里的选项会传递给 sass-loader
      /* scss: {
        // sourceMap: isProduction,
        prependData: `@import "src/assets/scss/component.scss";`
      }, */
      // 这里的选项会传递给 stylus-loader
      /* stylus: {
        // sourceMap: isProduction
      } */
    }
  },

  devServer: {
    // 是否自动打开浏览器页面
    open: true,

    // 是否热更新
    hot: true,

    // 指定使用一个 host。默认是 127.0.0.1
    host: getLANIp(),

    // 端口地址
    port: 8080,

    // 是否使用 https 提供服务
    https: false,

    // 是否压缩
    compress: false,

    // 是否显示进度条
    progress: true,

    // 让浏览器 显示 webpack 编译过程中 出现的警告和错误
    overlay: {
      warnings: true,
      errors: true
    } /* ,
    // 配置跨域处理
    proxy: {
      [process.env.VUE_APP_API_URL_PROXY]: {
        // 目标 API 地址
        target: process.env.VUE_APP_API_URL,
        //开启代理：在本地创建虚拟服务端发送请求数据，并同时接收请求响应数据，这样客户端和服务端进行数据交互就不会有跨域问题
        changeOrigin: true,
        logLevel: 'debug',
        // 重写路径
        pathRewrite: { [`^${process.env.VUE_APP_API_URL_PROXY}`]: '' }

        // 如果要代理 websockets
        // ws: true
        // secure: false
      }
    }*/
  },

  // 向 PWA 插件传递选项
  // pwa: {},

  // 可以用来传递任何第三方插件选项
  // pluginOptions: {},

  // 对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    ui && demandImportLibrary(config)

    worker && appendWorkerLoader(config)

    // ie兼容
    // config.entry('main').add('babel-polyfill')

    // 修复HMR
    config.resolve.symlinks(true)

    appendCommonStyle(config)

    removeTagSpace(config)

    handleHtmlWebpackPlugin(config)

    appendAlias(config)

    // 生产环境配置
    if (isProduction) {
      // 忽略打包
      config.externals(externals)

      handleChunk(config)

      compressImg(config)

      // 打包分析
      process.env.IS_ANALYZ && packageAnalyz(config)
    }
  },

  configureWebpack: config => {
    const plugins = []

    if (isProduction) {
      config.mode = 'production'

      plugins.push(...getProductionPlugins())
    } else {
      config.mode = 'development'

      plugins.push(...getDevelopmentPlugins())
    }

    config.plugins = [...config.plugins, ...plugins]
  }
}
