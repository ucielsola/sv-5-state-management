<script lang="ts">
	import bookStore from "$lib/domains/books/core/store/booksStore.svelte";
	import BookList from "$lib/domains/components/BookList.svelte";

	let book = $derived(bookStore.book);
	let loadingBook = $derived(bookStore.loading);
</script>

<div class="wrapper">
	<div class="left">
		<BookList />
	</div>

	<div class="right">
		{#if book}
			<div class="book">
				<h2>{book.title}</h2>
				<p>{book.authors[0]?.name}</p>
			</div>
		{:else if loadingBook}
			<p>Loading book...</p>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.left {
		background-color: lightblue;
	}

	.right {
		background-color: lightgreen;
	}

	.book {
		padding: 20px;
		border: 1px solid black;
		border-radius: 5px;
	}
</style>
