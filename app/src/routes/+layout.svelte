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
		height: 100vh;
	}

	main {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		overflow-x: hidden;
		margin: 0 auto;
		height: 100%;
	}
</style>
