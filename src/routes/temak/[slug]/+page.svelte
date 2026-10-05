<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.topic.title} – Java alapok</title>
</svelte:head>

<article class="prose max-w-none dark:prose-invert">
	<data.Content />
</article>

<nav class="mt-12 flex items-center justify-between gap-4 border-t pt-6 text-sm">
	{#if data.prev}
		<a href={`/temak/${data.prev.slug}`} class="text-muted-foreground hover:text-foreground"
			>← {data.prev.title}</a
		>
	{:else}
		<span></span>
	{/if}
	{#if data.next}
		<a
			href={`/temak/${data.next.slug}`}
			class="text-right text-muted-foreground hover:text-foreground">{data.next.title} →</a
		>
	{/if}
</nav>
