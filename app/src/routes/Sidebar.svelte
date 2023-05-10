<script>
	import { page } from '$app/stores';
	const historyIcon = `src/assets/icons/history.svg`;
	const homeIcon = `src/assets/icons/home.svg`;
	const savedIcon = `src/assets/icons/saved.svg`;
	const profileIcon = `src/assets/icons/profile.svg`;
</script>

<div class="sidebar">
	<section>
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/home' ? 'page' : undefined}>
					<a href="/home"> <img src={homeIcon} alt="home icon" /></a>
				</li>
				<li aria-current={$page.url.pathname === '/history' ? 'page' : undefined}>
					<a href="/history"><img src={historyIcon} alt="history icon" /></a>
				</li>
				<li aria-current={$page.url.pathname === '/saved' ? 'page' : undefined}>
					<a href="/saved"> <img src={savedIcon} alt="saved icon" /></a>
				</li>
				<li aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
					<a href="/account"> <img src={profileIcon} alt="profile icon" /></a>
				</li>
			</ul>
		</nav>
	</section>
</div>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;

		justify-content: center;
		padding: 10px;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: var(--color-border-1);
		width: fit-content;
		/* height: fit-content; */
		flex: 1;
		padding: 0px 0;
		border-radius: 5px;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}

	nav {
		padding: 0px 0;
		display: flex;
		flex: 1;
		justify-content: flex-start;
		backdrop-filter: blur(25px) saturate(200%);
		-webkit-backdrop-filter: blur(25px) saturate(200%);
		background-color: rgba(255, 255, 255, 0.49);
		border-radius: 5px;
		border: 1px solid rgba(209, 213, 219, 0.3);
	}

	ul {
		position: relative;
		padding: 5px;
		margin: 0;
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		align-items: flex-start;
		list-style: none;
		justify-content: center;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		width: 35px;
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10px;
	}

	nav a {
		display: flex;
		text-align: left;
		padding: 0 0.5rem;
		font-weight: 600;
		font-size: 0.8rem;
		color: #000;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
