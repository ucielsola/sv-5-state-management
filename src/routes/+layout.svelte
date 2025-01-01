<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";

	import Notifications from "$lib/domains/notifications/components/Notifications.svelte";
	import booksListStore from "$lib/domains/books/core/store/booksListStore.svelte";

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	booksListStore.hydrate(data.books);
</script>

<div class="wrapper">
	<div class="topbar">
		<Notifications />
	</div>

	<div class="page">
		{@render children()}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: 20px;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-bottom: 20px;
	}
</style>
