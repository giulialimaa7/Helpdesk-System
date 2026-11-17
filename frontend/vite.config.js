import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // build: {
  //   outDir: 'dist',
  //   //assegura que o Vite manipule corretamente a conversão de URLs no build final
  //   assetsDir: 'assets',
  //   rollupOptions: {
  //     output: {
  //       manualChunks: undefined
  //     }
  //   },
  //   //copia arquivos adicionais para a pasta dist
  //   copyPublicDir: true
  // },
  
  // //define a pasta public onde ficam arquivos estáticos
  // publicDir: 'public',
  
  // server: {
  //   historyApiFallback: true //importante para roteamento SPA
  // }
})