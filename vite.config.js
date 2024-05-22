// vite.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  publicDir: "src",
  base: "/cse160-asg5b/",
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        asg5: 'src/asg5.html'
      },
      plugins: [nodeResolve({ browser: true })],
    },
  },
  optimizeDeps: {
    include: ["three"]
  }
};