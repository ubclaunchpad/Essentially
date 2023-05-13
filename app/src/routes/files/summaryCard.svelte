<script lang="ts">
	export let title: string;
	export let date: string;
	export let tags: string[];
	export let type: string;
	export let description: string;
</script>

<div class="text-column">
	<div class="summary-card">
		<h3>{title}</h3>

		<p class="description">{description}</p>

		<ul class="tags">
			{#each tags as tag}
				<li>#{tag}</li>
			{/each}
		</ul>

		<div class="bottombar">
			<ul />
		</div>
	</div>
</div>

<style>
	.summary-card {
		background-color: var(--color-bg-0);
		border: 2px solid var(--color-border-1);
		border-radius: 5px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 25rem;
		row-gap: 4px;
	}

	.description {
		flex: 1;
		overflow-y: scroll;
		padding: 10px 4px;
		border-top: 1px solid var(--color-bg-1);
		border-bottom: 1px solid var(--color-bg-1);
		font-size: 0.9rem;
		margin: 0;
		font-weight: 500;
	}

	.summary-card h3 {
		width: 100%;
		font-size: 0.9rem;
		padding: 10px 10px 4px;
		margin: 0;
		height: 3rem;
	}
	.bottombar {
		display: flex;
	}

	.bottombar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: var(--color-border-1);
		width: 100%;
		padding: 0px 0;
	}

	.bottombar ul {
		padding: 0px 0;
		display: flex;
		flex: 1;
		backdrop-filter: blur(25px) saturate(200%);
		-webkit-backdrop-filter: blur(25px) saturate(200%);
		background-color: rgba(255, 255, 255, 0.49);
		border: 1px solid rgba(209, 213, 219, 0.3);
		margin: 0;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		font-weight: 600;
		column-gap: 4px;
	}

	.tags li {
		width: fit-content;
		font-size: 0.8rem;
	}

	ul {
		padding: 5px;
		margin: 0;
		display: flex;
		align-items: flex-start;
		list-style: none;
		justify-content: space-between;
	}

	.bottombar li {
		height: 100%;
		width: 35px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px;
	}
	li img {
		width: 100%;
	}
</style>
