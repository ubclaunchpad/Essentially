<script lang="ts">
	import { onMount } from 'svelte';
	export let textInput = '';
	export let value = '';

	onMount(() => {
		loadItems();
	});

	function loadItems() {
		fetch('src/assets/text.txt')
			.then((response) => response.text())
			.then((data) => {
				textInput = data;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
	}

	function handleTextChange(event: Event) {
		const target = event.target as HTMLInputElement;
		textInput = target.value;
	}
</script>

<div class="article-input">
	<h3>Enter Article Link</h3>
	<input type="text" bind:value on:input={handleChange} placeholder="https://" />

	<div class="divider">
		<div />
		<h4>OR</h4>
		<div />
	</div>
	<h3>Paste Text</h3>
	<textarea bind:value={textInput} on:input={handleTextChange} placeholder="Enter text here" />
	<button class="button-16">Generate</button>
</div>

<style>
	.article-input {
		background-color: var(--color-bg-0);
		border: 2.5px solid var(--color-border-1);
		border-radius: 5px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		flex: 1;
		max-width: 750px;
		padding: 0 10px 10px;
	}
</style>
