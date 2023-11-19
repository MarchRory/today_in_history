import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: '/src/'
      }
    ]
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  server: {
    hmr: true,
    open: true
  },
  base: '/software_architecture_lab2/',
  build: {
    outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
    sourcemap: false,
    // minify默认esbuild，esbuild模式下terserOptions将失效
    // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 去除 console
        drop_debugger: true, // 去除 debugger
      },
    },
    chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 静态资源拆分
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      }
    }
  },
})