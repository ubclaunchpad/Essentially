<script>
	import Divider from '$lib/components/Divider.svelte';

	let isLogin = true;
	let email = '';
	let password = '';

	function handleSubmit(event) {
		event.preventDefault();

		if (isLogin) {
			// handle login
			console.log(`Logging in with email ${email} and password ${password}`);
		} else {
			// handle sign up
			console.log(`Signing up with email ${email} and password ${password}`);
		}
	}
</script>

<div class="page">
	<section>
		<h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
		<div class="social-auth">
			<button on:click={signInWithGoogle}>Continue with Google</button>
		</div>

		<Divider />

		<form on:submit={handleSubmit}>
			<label>
				Email:
				<input type="email" bind:value={email} required />
			</label>

			<label>
				Password:
				<input type="password" bind:value={password} required />
			</label>

			<button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
		</form>

		<p>
			{isLogin ? "Don't have an account?" : 'Already have an account?'}
			<button type="button" on:click={() => (isLogin = !isLogin)}>
				{isLogin ? 'Sign Up' : 'Sign In'}
			</button>
		</p>
	</section>
</div>

<style>
	.page {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--color-border-1);
		width: fit-content;
		flex: 1;
		padding: 20px;
		border-radius: 5px;
		max-width: 550px;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 4px;
		background-color: rgba(244, 244, 244, 0.828);
		row-gap: 10px;
	}

	h1 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
		flex: 1;
	}

	label {
		display: flex;
		flex-direction: column;
		row-gap: 2px;
		padding: 5px;
		font-weight: 500;
	}

	input[type='email'],
	input[type='password'] {
		display: block;
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-bg-1);
		border-radius: 0.25rem;
		font-size: 1rem;
		line-height: 1.5;
	}

	button[type='submit'],
	button[type='button'] {
		cursor: pointer;
		/* background-color: var(--color-bg-0); */
		padding: 5px;
		width: fit-content;
		/* color: var(--color-text); */
	}

	.social-auth {
		display: flex;
		flex-direction: column;
		width: 100%;
		flex: 1;
		row-gap: 10px;
		padding: 0 0 10px;
	}

	.social-auth button {
		flex: 1;
		width: 100%;
		background-color: var(--color-bg-0);
		padding: 5px;
		color: var(--color-text);
	}
</style>
