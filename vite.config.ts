import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import fullReloadPlugin from "vite-plugin-full-reload";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    react(),
    RubyPlugin(),
    Icons({ compiler: "jsx", jsx: "react" }),
    fullReloadPlugin(
      [
        "config/routes.rb",
        "app/models/**/*.rb",
        "app/serializers/**/*.rb",
        "app/views/**/*.{html,html.erb}",
        "app/controllers/**/*.rb",
      ],
      { delay: 200 }
    ),
  ],
});
