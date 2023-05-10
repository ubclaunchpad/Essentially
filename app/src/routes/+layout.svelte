<script>
	import Sidebar from './Sidebar.svelte';
	import './styles.css';
</script>

<div class="app">
	<Sidebar />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: row;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		/* max-width: 64rem; */
		margin: 0 auto;
		height: 100vh;
	}
</style>
