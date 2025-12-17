// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
// GitHub Pages: https://adrianql5.github.io/ApuntesWeb/
export default defineConfig({
	site: 'https://adrianql5.github.io/ApuntesWeb',
	base: '/ApuntesWeb',
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'Apuntes Universitarios',
			description: 'Apuntes de Ingeniería Informática organizados por curso y asignatura',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/adrianql' },
			],
			sidebar: [
				{
					label: '🏠 Inicio',
					link: '/',
				},
				{
					label: '📚 Segundo Curso',
					items: [
						{
							label: '1️⃣ Primer Cuatrimestre',
							autogenerate: { directory: 'segundo/primer-cuatrimestre' },
							collapsed: true,
						},
						{
							label: '2️⃣ Segundo Cuatrimestre',
							autogenerate: { directory: 'segundo/segundo-cuatrimestre' },
							collapsed: true,
						},
					],
				},
				{
					label: '📖 Tercer Curso',
					items: [
						{
							label: '1️⃣ Primer Cuatrimestre',
							autogenerate: { directory: 'tercero/primer-cuatrimestre' },
							collapsed: true,
						},
					],
				},
			],
			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0',
					},
				},
			],
			components: {
				// Personalización de componentes si es necesario
			},
		}),
	],
});
