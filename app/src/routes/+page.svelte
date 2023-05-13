<script>
	import Button from '$lib/components/Buttons/Button.svelte';
	import HashtagIcon from '$lib/components/icons/HashtagIcon.svelte';
</script>

<svelte:head>
	<title>Essentially</title>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
	<meta name="description" content="Essentially application" />
</svelte:head>

<section>
	<h1>Essentially Project</h1>

	<div class="links">
		<Button type="icon">
			<a
				href="https://www.notion.so/Essentially-101fab9eeb674f3baab8fa8c4ce54426?pvs=4"
				target="_blank"
			>
				<HashtagIcon />
				<h6>Notion</h6>
			</a>
		</Button>

		<Button type="icon">
			<a href="https://www.figma.com/files/project/92254476" target="_blank">
				<HashtagIcon />
				<h6>Figma</h6>
			</a>
		</Button>

		<Button type="icon">
			<a href="https://github.com/ubclaunchpad/Essentially" target="_blank">
				<HashtagIcon />
				<h6>Github</h6>
			</a>
		</Button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		flex: 1;
		width: 100%;
	}

	.links {
		border-radius: 40px;
		border: 4px solid var(--color-border-1);
		padding: 0.2rem 0.4rem;
		column-gap: 2rem;
		display: flex;
		justify-content: space-between;
	}

	h1 {
		font-size: 3rem;
		font-weight: bold;
	}
</style>
