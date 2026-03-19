// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
// GitHub Pages: https://adrianql5.github.io/ApuntesWeb/
export default defineConfig({
	site: 'https://adrianql5.github.io/ApuntesWeb',
	base: '/ApuntesWeb',
	trailingSlash: 'always',
	vite: {
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					if (
						warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
						warning.message?.includes('@astrojs/internal-helpers/remote')
					) {
						return;
					}
					warn(warning);
				},
			},
		},
	},
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
	},
	integrations: [
		starlight({
			title: 'Apuntes Ingeniería Informática',
			description: 'Apuntes de Ingeniería Informática organizados por curso y asignatura',
			disable404Route: true,
			tableOfContents: { minHeadingLevel: 1, maxHeadingLevel: 3 },
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
			},
			customCss: [
				'./src/styles/custom.css',
				'./node_modules/katex/dist/katex.min.css',
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/adrianql5/adrianql5' },
			],
			sidebar: [
				{
					label: 'Inicio',
					link: '/',
				},
				{
					label: 'Segundo Curso',
					items: [
						{
							label: 'Primer Cuatrimestre',
							autogenerate: { directory: 'segundo/primer-cuatrimestre' },
							collapsed: true,
						},
						{
							label: 'Segundo Cuatrimestre',
							autogenerate: { directory: 'segundo/segundo-cuatrimestre' },
							collapsed: true,
						},
					],
				},
				{
					label: 'Tercer Curso',
					items: [
						{
							label: 'Primer Cuatrimestre',
							autogenerate: { directory: 'tercero/primer-cuatrimestre' },
							collapsed: true,
						},
						{
							label: 'Segundo Cuatrimestre',
							autogenerate: { directory: 'tercero/segundo-cuatrimestre' },
							collapsed: true,
						},
					],
				},
			],
		}),
	],
});
