<script lang="ts">
	export let title: string;
</script>

<div class="dashboard">
	<section>
		<h1>{title}</h1>
	</section>
	<slot />
</div>

<style>
	.dashboard {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		flex: 1;
	}

	.dashboard h1 {
		font-weight: 700;
		text-align: left;
		width: 100%;
		margin: 0;
		padding-bottom: 1rem;
		font-size: 1.5rem;
	}

	.dashboard section {
		display: flex;
		width: 100%;
		/* max-width: 1000px; */
		justify-content: space-between;
		align-items: center;
	}
</style>
