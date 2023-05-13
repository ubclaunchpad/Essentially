<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/Buttons/Button.svelte';
	import ProfileIcon from '$lib/components/icons/ProfileIcon.svelte';
	import SavedIcon from '$lib/components/icons/SavedIcon.svelte';
	import SourcesIcon from '$lib/components/icons/SourcesIcon.svelte';
	import SummaryIcon from '$lib/components/icons/SummaryIcon.svelte';
</script>

<div class="sidebar">
	<section>
		<Button type="icon"
			><a href="./"
				><SummaryIcon />
				<h6>Essentially</h6></a
			></Button
		>
	</section>
	<section>
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/note' ? 'page' : undefined}>
					<Button type="icon"
						><a href="./resources"
							><SourcesIcon />
							<h6>Resources</h6></a
						></Button
					>
				</li>

				<li aria-current={$page.url.pathname === '/saved' ? 'page' : undefined}>
					<Button type="icon"
						><a href="./files"
							><SavedIcon />
							<h6>Files</h6></a
						></Button
					>
				</li>

				<li aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
					<Button type="icon"
						><a href="./account"
							><ProfileIcon />
							<h6>Account</h6></a
						></Button
					>
				</li>
			</ul>
		</nav>
	</section>
</div>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 2px;
		z-index: 20;
		row-gap: 3px;
		border-right: 4px solid var(--color-bg-1);
	}

	.sidebar > :first-child {
		height: 100%;
		width: 100%;
		justify-content: space-between;
	}

	section {
		/* background-color: var(--color-bg-1); */
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: fit-content;
		padding: 1rem 0;
		border-radius: 5px;
		box-shadow: rgba(149, 157, 165, 0.1) 0px 0px 10px;
	}

	nav {
		padding: 0px 0;
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: space-between;
		border-radius: 5px;
	}

	ul {
		padding: 5px;
		margin: 0;
		display: flex;
		flex-direction: column;
		row-gap: 35px;
		align-items: flex-start;
		list-style: none;
		justify-content: center;
	}

	li {
		position: relative;
		height: 100%;
		width: fit-content;
		max-width: 100%;
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}
</style>
