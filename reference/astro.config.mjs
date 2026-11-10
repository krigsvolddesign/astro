import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
export default defineConfig({build:{inlineStylesheets:"never"},base: process.env.NIGHTJAR_BASE || '/', vite: {build: {assetsInlineLimit: 0}, resolve: {alias: {'@nightjar/shell': fileURLToPath(new URL('./src/components/Krigsvold.astro', import.meta.url)), '@nightjar/button': '@krigsvold/astro/Button.astro'}}}});
