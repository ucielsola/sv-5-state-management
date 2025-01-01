<script lang="ts">
	import booksListStore from "$lib/domains/books/core/store/booksListStore.svelte";
	import bookStore from "$lib/domains/books/core/store/booksStore.svelte";
	import notificationsStore from "$lib/domains/notifications/core/stores/notificationsStore.svelte";

	import type { Book } from "$lib/domains/books/core/types/Book";

	let books = $derived(booksListStore.books);

	const onClickBook = (book: Book) => {
		if (book.id === bookStore.book?.id) return;

		notificationsStore.addNotification({
			type: "info",
			message: `Loading Book "${book.title}" loaded successfully`,
		});

		bookStore.loadBookById(book.id, () =>
			notificationsStore.addNotification({
				type: "success",
				message: `Book "${book.title}" loaded successfully`,
			})
		);
	};
</script>

<div class="list">
	{#each books as book}
		{@render Book(book)}
	{/each}
</div>

{#snippet Book(book: Book)}
	<button onclick={() => onClickBook(book)} class="book">
		<span class="title">
			{book.title}
		</span>
		<span class="author">
			{book.authors[0]?.name}
		</span>
	</button>
{/snippet}

<style>
	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.book {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		background-color: #f2f2f2;
		border-radius: 0.5rem;
		cursor: pointer;
		text-align: left;
	}

	.book .title {
		font-weight: bold;
		font-size: 1.2rem;
	}

	.book .author {
		font-size: 1rem;
	}
</style>
