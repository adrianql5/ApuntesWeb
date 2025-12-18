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
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
	integrations: [
		starlight({
			title: 'Apuntes Ingeniería Informática',
			description: 'Apuntes de Ingeniería Informática organizados por curso y asignatura',
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
				{
					tag: 'script',
					content: `
						document.addEventListener('DOMContentLoaded', function() {
							// Crear contenedor de controles Zen
							const zenControls = document.createElement('div');
							zenControls.className = 'zen-controls';
							zenControls.innerHTML = \`
								<button class="zen-btn" id="zen-sidebar-btn" title="Toggle Menú Lateral">☰</button>
								<button class="zen-btn" id="zen-toc-btn" title="Toggle Sinopsis">📑</button>
							\`;
							document.body.appendChild(zenControls);
							
							// Toggle Sidebar (menú izquierdo)
							document.getElementById('zen-sidebar-btn').addEventListener('click', function() {
								document.body.classList.toggle('zen-hide-sidebar');
								this.classList.toggle('active');
							});
							
							// Toggle TOC (sinopsis derecha)
							document.getElementById('zen-toc-btn').addEventListener('click', function() {
								document.body.classList.toggle('zen-hide-toc');
								this.classList.toggle('active');
							});
						});
					`,
				},
			],
			components: {
				// Personalización de componentes si es necesario
			},
		}),
	],
});
