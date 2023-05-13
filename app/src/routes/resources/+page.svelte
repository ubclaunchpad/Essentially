<script lang="ts">
	import Button from '$lib/components/Buttons/Button.svelte';
	import Info from '$lib/components/Info.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import Dashboard from '$lib/components/layouts/dashboard.svelte';
</script>

<svelte:head>
	<title>Resources</title>
	<meta name="description" content="Current active resources" />
</svelte:head>

<Dashboard title="Resources">
	<div class="body">
		<Info
			>Resources are dedicated hubs for specific domain knowledge. Use resources to make spaces for
			your class notes, research topics, company docs, meeting notes and so much more</Info
		>

		<div class="list">
			<div>
				<h3>Name</h3>
				<h6>ETC</h6>
			</div>
			<div>
				<h3>Name</h3>
				<h6>ETC</h6>
			</div>
		</div>
		<div class="new">
			<Button type="icon"
				><PlusIcon />
				<h6>New</h6></Button
			>
		</div>
	</div>
</Dashboard>

<style>
	.body {
		flex: 1;
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		row-gap: 1rem;
	}

	.list {
		display: flex;
		flex-direction: row;
		padding: 10px 0;
		gap: 1rem;
		overflow-x: scroll;
		scroll-behavior: smooth;
		width: 100%;
	}

	.list > div {
		display: flex;
		flex-direction: column;
		box-shadow: rgba(149, 157, 165, 0.1) 0px 0px 10px;
		justify-content: center;
		align-self: center;
		border: 2px solid var(--color-border-1);
		padding: 1rem 1.5rem;
		border-radius: 1rem;
		min-width: 500px;
		height: 150px;
	}
</style>
