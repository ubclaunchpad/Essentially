<script lang="ts">
	import SummaryCard from './summaryCard.svelte';

	let summary = [
		{ title: 1, date: 1 },
		{ title: 1, date: 1 },
		{ title: 1, date: 1 },
		{ title: 1, date: 1 },
		{ title: 1, date: 1 },
		{ title: 1, date: 1 },
		{ title: 1, date: 1 },
		{ title: 1, date: 1 }
	];
</script>

<svelte:head>
	<title>History</title>
	<meta name="past summarized articles" content="history" />
</svelte:head>

<div class="text-column">
	<div class="article-input">
		<h3>History</h3>

		<div class="summaries">
			{#each summary as { title, date }, i}
				<SummaryCard />
			{/each}
		</div>
	</div>
</div>

<style>
	.summaries {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
