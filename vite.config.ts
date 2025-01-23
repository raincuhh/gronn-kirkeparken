import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	clearScreen: false,
	publicDir: "public",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 8000,
		strictPort: true,
		open: true,
		host: "0.0.0.0",
	},
	build: {
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		outDir: "dist/",
		sourcemap: !!process.env.TAURI_DEBUG,
	},
});
