<script lang="ts">
	import Source from '$lib/components/source/Source.svelte';
	import { onMount } from 'svelte';
	export let textInput = '';
	let summary =
		'Lord of the Flies is a novel by William Golding that explores the themes of human nature, power, and corruption. The story follows a group of young boys stranded on an uninhabited island after a plane crash as they attempt to establish a new society without adults. The book highlights the natural tendencies towards violence and corruption in humans and demonstrates how power can be corrupting. The novel also uses symbolism, such as the conch shell and the Lord of the Flies, to convey its themes. Ultimately, Lord of the Flies is a warning about the dangers of unchecked power, mob mentality, and the fragility of civilization. The book continues to be relevant today and its message is as powerful and poignant as it was when it was first published in 1954.';
	$: showArticle = false;
	$: articleTextBody = showArticle ? textInput : summary;
	$: sumWords = countWords(summary);
	$: articleWords = countWords(textInput);
	$: numWords = showArticle ? articleWords : sumWords;
	$: readingTime = calculateReadingTime(articleTextBody);
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

	function countWords(text: string) {
		const words = text.split(' ');
		return words.length;
	}

	function calculateReadingTime(text: string) {
		const wordsPerMinute = 200; // Average reading speed in words per minute
		const wordCount = text.trim().split(/\s+/).length; // Split text by whitespace to count words
		const readingTime = Math.ceil(wordCount / wordsPerMinute); // Round up reading time to nearest minute
		return readingTime;
	}

	const generateSummary = async () => {
		showArticle = !showArticle;
		sumWords = countWords(summary);
		numWords = sumWords;
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="article-input">
	<div class="topbar">
		<h3>Lord of the Flies</h3>
		<!-- <button on:click={generateSummary}><img src={summaryIcon} alt="summaryIcon" /></button> -->
	</div>
	<div class="article-body">
		<Source sourceItem={{ title: 'about', content: articleTextBody }} />
		<Source sourceItem={{ title: 'about', content: articleTextBody }} />
		<Source sourceItem={{ title: 'about', content: articleTextBody }} />
		<Source sourceItem={{ title: 'about', content: articleTextBody }} />
		<Source sourceItem={{ title: 'about', content: articleTextBody }} />

		<div />
	</div>
</div>

<!-- 
<div class="analytics">
	<div class="article-input">
		<div class="divider">
			<div />
			<h4>Stats</h4>
			<div />
		</div>

		<div class="toolbar">
			<h4>Word count</h4>
			<h4>{numWords} words</h4>
		</div>

		<div class="toolbar">
			<h4>Reading time</h4>
			<h4>{readingTime} minutes</h4>
		</div>
	</div>

	<div class="article-input">
		<h3>Sources</h3>
		<ul class="source-list" />
	</div>
</div> -->

<style>
	.source {
		display: flex;
		justify-content: space-between;
		background-color: var(--color-bg-2);
		padding: 1px 0.4rem;
	}

	.topbar {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}
	.topbar button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		width: fit-content;
		padding: 0;
	}
	.source-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		list-style-type: decimal;
		row-gap: 10px;
	}

	.toolbar {
		display: flex;
		justify-content: space-between;
		width: 100%;
		column-gap: 10px;
		padding: 10px 10px;
	}

	.toolbar h4 {
		font-size: 0.8rem;
		margin: 0;
	}

	.article-input {
		background-color: var(--color-bg-0);
		border: 2.5px solid var(--color-border-1);
		border-radius: 5px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	.analytics {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 0;
		margin: 0;
		row-gap: 10px;
		flex: 1;
	}

	.analytics > div {
		flex: 1;
		height: 100%;
	}

	.analytics div p {
		font-size: 0.8rem;
	}
	.article-input p {
		font-weight: 500;
		font-size: 14px;
		padding: 0 20px;
		line-height: 30px;
		overflow-y: scroll;
		max-width: 750px;
	}

	.article-body {
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.article-input p::selection {
		color: var(--color-theme-1);
		background-color: var(--color-bg-1);
	}
</style>
