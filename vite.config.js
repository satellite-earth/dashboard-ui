import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	build: {
		target: ['chrome89', 'edge89', 'firefox89', 'safari15'],
		sourcemap: true,
	},
	plugins: [react()],
});
