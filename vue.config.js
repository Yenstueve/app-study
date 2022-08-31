const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack:{
    resolve:{
      alias:{
        '@':'src',
        'assets':'@/assets',
        'component':'@/component',
        'router':'@/router',
        'views':'@/views',
        
      }
    }
  }
})
