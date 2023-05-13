<script lang="ts">
</script>

<div class="info-wrapper">
	<div class="info">
		<slot />
	</div>
</div>

<style>
	.info-wrapper {
		padding: 0.4rem 0;
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.info {
		width: 100%;
		column-gap: 10px;
		display: flex;
		max-width: 650px;
		justify-content: flex-start;
		background-color: var(--color-bg-2);
		border-radius: 5px;
		padding: 1rem 0.9rem;
		user-select: none;
	}
</style>
