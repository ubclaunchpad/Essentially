<script lang="ts">
	import type { SourceItemI } from './Source';
	const summaryIcon = `src/assets/icons/summary.svg`;
	export let sourceItem: SourceItemI;

	let isExpanded = true;

	function toggleText() {
		isExpanded = !isExpanded;
	}
</script>

<div class="source-item">
	<div class="source">
		<h4>{sourceItem.title}</h4>
		<button on:click={toggleText}><img src={summaryIcon} /></button>
	</div>

	{#if isExpanded}
		<p>{sourceItem.content}</p>
	{/if}
</div>

<style>
	.source-item {
		display: flex;
		flex-direction: column;
		border: 4px solid var(--color-bg-2);
		/* border-bottom: 4px solid var(--color-border-1); */
		margin-bottom: 1rem;
	}

	.source-item p {
		padding: 10px;
		max-width: 750px;
	}

	.source {
		display: flex;
		justify-content: space-between;
		background-color: var(--color-bg-2);
		padding: 1px 0.4rem;
	}

	.source h4 {
		text-transform: capitalize;
	}

	.source button {
		background-color: transparent;
		padding: 0;
		margin: 0;
	}
</style>
