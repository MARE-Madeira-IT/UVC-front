import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: "/src",
            redux_modules: "/redux/redux-modules",
        },
    },
    // base: "/",
    base: "https://mare-madeira-it.github.io/UVC-front/",
    preview: {
        port: 3000,
        strictPort: true,
    },
    server: {
        watch: {
            usePolling: true,
        },
        port: 3000,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:3000",
    },
});
