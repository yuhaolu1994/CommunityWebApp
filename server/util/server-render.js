const serialize = require('serialize-javascript')
const ejs = require('ejs')
const bootstrap = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName = require('@material-ui/core/styles/createGenerateClassName').default
const colors = require('@material-ui/core/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    // change stores object to stores json array
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    // webpack打包server-entry.js成bundle, createStoreMap来自store.js
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default

    const routeContext = {}
    // appState and topicStore Object
    const stores = createStoreMap()

    const sheetsRegistry = new SheetsRegistry()
    const jss = create(preset())
    jss.options.createGenerateClassName = createGenerateClassName

    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      },
    })

    const app = createApp(stores, routeContext, sheetsRegistry, jss, theme, req.url)

    // The react application you wish to walk
    // Now for the bootstrapping/rendering process (on a client/server)
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/StaticRouter.md
    bootstrap(app).then(() => {
      // StaticRouter的参数
      if (routeContext.url) {
        // 通过设置头让浏览器自动跳转
        // context.url will contain the URL to redirect to if a <Redirect> was used
        res.status(302).setHeader('Location', routeContext.url)
        res.end()
        return
      }

      // 服务端渲染title，meta标签
      const helmet = Helmet.rewind()

      const state = getStoreState(stores)

      const content = ReactDomServer.renderToString(app)

      // 模版里需要把state对象转换成string
      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
        materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}

