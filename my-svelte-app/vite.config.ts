import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['exifreader'],
  },
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: '/src/lib'
    }
  }
});
