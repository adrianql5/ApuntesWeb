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
							// Detectar si estamos en una página splash (sin sidebar)
							const isSplashPage = document.querySelector('[data-template="splash"]') !== null ||
								window.location.pathname === '/ApuntesWeb/' ||
								window.location.pathname === '/ApuntesWeb';
							
							// Solo mostrar controles Zen si hay sidebars
							const hasSidebar = document.querySelector('#starlight__sidebar, .sidebar, nav[aria-label="Main"]') !== null;
							const hasToc = document.querySelector('.right-sidebar, starlight-toc') !== null;
							
							if (!isSplashPage && (hasSidebar || hasToc)) {
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
							}
							
							// Convertir selector de tema en toggle de click
							const themeSelect = document.querySelector('starlight-theme-select');
							if (themeSelect) {
								const select = themeSelect.querySelector('select');
								if (select) {
									// Crear botón personalizado para reemplazar el select
									const themeBtn = document.createElement('button');
									themeBtn.className = 'theme-toggle-btn';
									themeBtn.innerHTML = '🌓';
									themeBtn.title = 'Cambiar tema';
									themeBtn.style.cssText = 'background:none;border:none;font-size:1.2rem;cursor:pointer;padding:4px 8px;opacity:0.8;transition:opacity 0.2s;';
									
									themeBtn.addEventListener('mouseenter', () => themeBtn.style.opacity = '1');
									themeBtn.addEventListener('mouseleave', () => themeBtn.style.opacity = '0.8');
									
									themeBtn.addEventListener('click', function(e) {
										e.preventDefault();
										const currentTheme = document.documentElement.getAttribute('data-theme');
										const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
										document.documentElement.setAttribute('data-theme', newTheme);
										localStorage.setItem('starlight-theme', newTheme);
									});
									
									// Ocultar select original y añadir botón
									select.style.display = 'none';
									themeSelect.appendChild(themeBtn);
								}
							}
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
