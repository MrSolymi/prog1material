<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { topics } from '$lib/content/topics';
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<a href="/" class="px-2 py-1 text-base font-semibold">Java alapok</a>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Témakörök</Sidebar.GroupLabel>
			<Sidebar.Menu class="gap-1">
				{#each topics as topic (topic.slug)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={page.url.pathname === `/temak/${topic.slug}`}>
							{#snippet child({ props })}
								<a href={`/temak/${topic.slug}`} {...props}>
									<span class="w-5 shrink-0 text-xs text-muted-foreground tabular-nums"
										>{topic.order}</span
									>
									<span>{topic.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
