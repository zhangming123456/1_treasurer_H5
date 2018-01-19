'use strict'

const path = require('path')
const fs = require('fs')
const demoPath = path.resolve(__dirname, '../src/demo_list.json')

const argv = require('yargs').argv
argv.simulate = argv.simulate || false

module.exports = {
  options: {
    vuxDev: false, // true
    vuxSetBabel: argv.simulate, // false
    vuxWriteFile: false,
    env: 'dev'
  },
  plugins: [
    'vux-ui',
    'inline-manifest',
    {
      name: 'duplicate-style',
      envs: ['production']
    },
    {
      name: 'progress-bar',
      envs: ['development']
    },
    {
      name: 'js-parser',
      test: /main\.js/,
      fn: function (source) {
        this.addDependency(demoPath)
        let list = fs.readFileSync(demoPath, 'utf-8')
        list = JSON.parse(list)
        if (argv.demo) {
          list = list.filter(item => {
            return item.indexOf(argv.demo) > -1
          })
        }
        // let str = [`{
        //     path: '/',
        //     name:'Me',
        //     component: function (resolve) {require(['@/view/Me'], resolve)}}`]
        // list.forEach(one => {
        //   let filename = one
        //   let path = `/${toDash(one)}`
        //   if (/#/.test(one)) {
        //     filename = one.split('#')[0]
        //     path = one.split('#')[1]
        //   }
        //   str.push(`{
        //     path: '${path}',
        //     name:'${filename}',
        //     component: function (resolve) {require(['@/view/${filename}.vue'], resolve)}}`
        //   )
        // })
        let str = [`{
            path: '/',
            name:'Me',
            component: () => import('./view/Me.vue').then(m => m.default)
            }`]
        list.forEach(one => {
          let filename = one
          let path = `/${toDash(one)}`
          if (/#/.test(one)) {
            filename = one.split('#')[0]
            path = one.split('#')[1]
          } else if (/^(component)/.test(one)) {

          }
          str.push(`{
            path: '${path}',
            name:'${filename}',
            component: () => import('./view/${filename}.vue').then(m => m.default)
          }`)
        })
        // console.log(str)
        // 404 page
        str.push(`{path: '*',component: () => import('./demos/40x.vue').then(m => m.default)}`)

        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        return source
      }
    },
    // {
    //   name: 'i18n',
    //   vuxStaticReplace: false,
    //   staticReplace: false,
    //   extractToFiles: 'src/locales/components.yml',
    //   localeList: ['en', 'zh-CN']
    // },
    {
      name: 'less-theme',
      path: 'src/theme.less'
    }
  ]
}

function toDash (str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase()
  }).replace('-', '')
}
