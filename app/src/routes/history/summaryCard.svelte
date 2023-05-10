<script lang="ts">
	let title = 'How to train your dragon';
	let date = 'Feb 2023';
</script>

<div class="text-column">
	<div class="summary-card">
		<h3>{title}</h3>
		<h6>{date}</h6>

		<div>
			<button>Summary Link</button>
			<button>Article Link</button>
			<button>Delete</button>
		</div>
	</div>
</div>

<style>
	.summary-card {
		background-color: var(--color-bg-0);
		border: 2px solid var(--color-border-1);
		border-radius: 5px;
		padding: 3px 30px;
		min-width: 300px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
