<script lang="ts">
	import { fly } from "svelte/transition";
	import notificationsStore from "../core/stores/notificationsStore.svelte";

	let notifications = $derived(notificationsStore.notifications);
</script>

<div class="wrapper">
	{#each notifications as notif, i (i)}
		<div
			class="notification {notif.type}"
			style={`z-index: calc(10*${i + 1})`}
			in:fly={{ duration: 300, y: -20 }}
			out:fly={{ duration: 300, y: -50 }}
		>
			<span>{notif.message}</span>
		</div>
	{/each}
</div>

<style>
	.wrapper {
		position: fixed;
		top: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1rem;
	}

	.notification {
		position: relative;
		margin-left: 10px;
		background-color: #f0f0f0;
		padding: 1rem;
		border-radius: 5px;
		border: 1px solid #191919;
	}

	.notification.info {
		background-color: #a4cfdf;
	}

	.notification.success {
		background-color: #99d99b;
	}

	.notification.error {
		background-color: #f44336;
	}
</style>
