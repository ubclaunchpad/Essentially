<script lang="ts">
	import Start from './Start.svelte';
	import Article from './Article.svelte';
	const saveIcon = `src/assets/icons/save.svg`;
	const shareIcon = `src/assets/icons/share.svg`;
	let showSummary = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column summary-page">
	<div class="summary-col">
		{#if showSummary === false}
			<Start />
		{:else}
			<Article />
		{/if}
	</div>
	<div class="flex">
		<div />
		<input type="text" placeholder="Ask anything" />
		<!-- <button> <img src={saveIcon} alt="save icon" /></button>
		<button> <img src={shareIcon} alt="share icon" /></button> -->
	</div>
</div>

<style>
	.flex {
		display: flex;
		justify-content: center;
		column-gap: 10px;
		align-items: center;
		width: 100%;
	}

	.summary-page {
		display: flex;
		flex-direction: column;
		row-gap: 1em;
		justify-content: flex-start;
		align-items: center;
		flex: 1;
		height: 100%;
	}

	.summary-page > .flex > input {
		box-sizing: border-box;
		height: 40px;
		border-radius: 7px;
		padding: 3px 10px;
		border: 2.5px solid var(--color-border-1);
		max-width: 650px;
		flex: 1;
		color: var(--color-theme-1);
	}

	.summary-page > .flex input::placeholder {
		color: var(--color-theme-1);
		opacity: 0.6;
	}
	.summary-col {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		column-gap: 20px;
		flex: 1;
		height: 100%;
		padding: 0;
		width: 100%;
		overflow: hidden;
	}
</style>
