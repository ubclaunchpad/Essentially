<script lang="ts">
	import Info from '$lib/components/Info.svelte';
	import Dashboard from '$lib/components/layouts/dashboard.svelte';
	import { profileStore } from '$lib/stores/ProfileStore';
	let email: string;

	profileStore.subscribe((value) => {
		email = value;
	});
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<Dashboard title="Settings">
	<section class="top-nav">
		<ul>
			<li>Profile</li>
			<li>Billing</li>
			<li>Configuration</li>
		</ul>
	</section>

	<section>
		<h4>Preferred Name</h4>
		<input placeholder="e.g. Joe" />
	</section>

	<section>
		<h4>Email Address</h4>
		<input disabled bind:value={email} placeholder="e.g. Joe" />
	</section>

	<section>
		<h4>Phone Number</h4>
		<input type="number" placeholder="e.g. +16045050199" />
	</section>

	<section>
		<div />
		<div>
			<button> <a href="/signin">Reset all data</a> </button>
			<button> <a href="/signin">Delete Account</a> </button>
		</div>
	</section>
</Dashboard>

<style>
	.top-nav {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.top-nav ul {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		flex: 1;
		column-gap: 30px;
		border-bottom: 2px solid var(--color-border-1);
		padding: 4px 2px;
		margin: 0;
	}

	.top-nav ul li {
		list-style-type: none;
		width: fit-content;
		padding: 5px 0px 0px;
		font-weight: 600;
		text-transform: uppercase;
	}

	.top-nav ul li:hover {
		color: var(--color-theme-1);
		cursor: pointer;
	}

	section {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}

	section input {
		padding: 6px 10px;
		margin: 0;
		height: fit-content;
		max-width: 450px;
	}

	.dashboard section input:disabled {
		background-color: var(--color-bg-2);
		font-weight: 600;
	}
</style>
