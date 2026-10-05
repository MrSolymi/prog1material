<script lang="ts">
	import { topics } from '$lib/content/topics';
</script>

<svelte:head>
	<title>Java alapok – Tananyag</title>
</svelte:head>

<h1 class="text-3xl font-bold tracking-tight">Java alapok</h1>
<p class="mt-3 text-muted-foreground">
	Ez a segédanyag a Java programozás alapjait foglalja össze, példakódokkal és magyarázatokkal. A
	témakörök sorrendben épülnek egymásra, de bármelyiket önállóan is végigolvashatod.
</p>

<ul class="mt-8 divide-y rounded-lg border">
	{#each topics as topic (topic.slug)}
		<li>
			<a
				href={`/temak/${topic.slug}`}
				class="flex items-baseline gap-4 px-4 py-3 transition-colors hover:bg-muted"
			>
				<span class="w-6 shrink-0 text-sm text-muted-foreground tabular-nums">{topic.order}.</span>
				<span class="font-medium">{topic.title}</span>
			</a>
		</li>
	{/each}
</ul>
