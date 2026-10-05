<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { ModeWatcher, mode, toggleMode } from 'mode-watcher';
	import { Moon, Sun } from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import TopicSidebar from '$lib/components/nav/TopicSidebar.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<Sidebar.Provider style="--sidebar-width: 20rem;">
	<TopicSidebar />

	<Sidebar.Inset>
		<header class="flex h-12 items-center justify-between border-b px-4">
			<Sidebar.Trigger />
			<Button variant="ghost" size="icon" onclick={toggleMode} aria-label="Sötét/világos mód">
				{#if mode.current === 'dark'}
					<Sun />
				{:else}
					<Moon />
				{/if}
			</Button>
		</header>

		<main class="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
