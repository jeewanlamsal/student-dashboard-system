import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Assuming you are using Tailwind v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
