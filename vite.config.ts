import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  server:{
    port:7000,
  },
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
      ],
      rules:[
          ['f-r',{float:"right"}]
      ]
    }),
  ]
})
