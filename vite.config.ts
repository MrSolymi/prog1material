import { escapeSvelte, mdsvex } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

const theme = { light: 'github-light', dark: 'github-dark' };
const highlighter = await createHighlighter({
	themes: [theme.light, theme.dark],
	langs: ['java', 'bash', 'json', 'text']
});

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					highlight: {
						highlighter: async (code, lang) => {
							const loaded = highlighter.getLoadedLanguages();
							const language = lang && loaded.includes(lang) ? lang : 'text';
							const html = highlighter.codeToHtml(code, {
								lang: language,
								themes: theme,
								defaultColor: false
							});
							return `{@html \`${escapeSvelte(html)}\`}`;
						}
					}
				})
			],
			extensions: ['.svelte', '.svx', '.md'],
			alias: {
				'$lib': 'src/lib',
				'$lib/*': 'src/lib/*'
			}
		})
	]
});
