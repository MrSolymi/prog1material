import { error } from '@sveltejs/kit';
import { topics, topicModules } from '$lib/content/topics';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => topics.map((topic) => ({ slug: topic.slug }));

export const load: PageLoad = async ({ params }) => {
	const index = topics.findIndex((topic) => topic.slug === params.slug);
	if (index === -1) error(404, 'Nincs ilyen témakör.');

	const topic = topics[index];
	const importer = topicModules[`/src/lib/content/temak/${topic.file}.md`];
	if (!importer) error(500, `Hiányzó tartalom: ${topic.file}.md`);

	const module = await importer();

	return {
		topic,
		Content: module.default,
		prev: index > 0 ? topics[index - 1] : null,
		next: index < topics.length - 1 ? topics[index + 1] : null
	};
};
