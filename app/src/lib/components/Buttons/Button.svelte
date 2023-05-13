<script>
	let buttonProps = {
		class: [$$restProps.class]
	};
</script>

{#if $$restProps.type === 'icon'}
	<button on:click on:mouseover on:mouseenter on:mouseleave class="icon">
		<slot class="content" />
	</button>
{:else}
	<button on:click on:mouseover on:mouseenter on:mouseleave {...buttonProps}> kmkmkmkm </button>
{/if}

<style lang="scss">
	.primary {
		background-color: var(--color-theme-1);
		color: var(--color-text-w);
	}

	.sm {
		font-size: 1em;
		padding: 0.1em;
	}
	.lg {
		font-size: 2em;
	}

	.icon {
		display: flex;
		justify-content: flex-start;
		column-gap: 10px;
		align-items: center;
		width: 100%;
		font-size: 1.5rem;
		color: var(--color-text);
		background-color: transparent;
		stroke: var(--color-text);

		:global(*) {
			padding: 0;
			margin: 0;
		}

		:global(a) {
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			column-gap: 10px;
			align-items: center;
			width: 100%;
			flex: 1;
			font-size: 1.5rem;
			color: var(--color-text);
		}

		&:hover {
			box-shadow: none;
			stroke: var(--color-theme-1);
			color: var(--color-theme-1);
		}
	}
</style>
