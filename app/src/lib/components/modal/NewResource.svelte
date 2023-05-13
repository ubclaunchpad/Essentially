<script lang="ts">
	import Modal from './Modal.svelte';

	let isModalOpen = true;

	const openModal = () => {
		isModalOpen = true;
	};

	const closeModal = () => {
		isModalOpen = false;
	};
</script>

<Modal isOpen={isModalOpen} title="sk">
	<h6>Make a new resource to learn and explore with AI</h6>

	<div class="row">
		<h5>Title</h5>
		<input />
	</div>

	<div class="row">
		<h5>About</h5>
		<textarea />
	</div>

	<div>
		<h4>Sources</h4>
		<h6>Add up to 3 sources to get started</h6>
	</div>

	<div class="row">
		<input />
		<button on:click={closeModal}>s</button>
	</div>
</Modal>

<style>
	.row {
		display: flex;
		column-gap: 1rem;
		justify-content: space-between;
	}

	.action {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 1rem 0 0;
	}

	.action button {
		width: 200px;
		transition: 0.4s all cubic-bezier(0.23, 1, 0.32, 1);
	}

	.action button:hover {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		width: 100%;
	}

	.modal-wrapper {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.modal {
		min-height: 400px;
		max-height: 90%;
		min-width: 400px;
		width: 650px;
		max-width: 90%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 3;
		background-color: #a90000;
		padding: 1rem 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: rgb(235, 235, 235);
		border-radius: 5px;
		box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
		margin: 0;
		padding: 0;
	}

	.modal-content {
		flex: 1;
		width: 100%;

		border-radius: 5px;
		padding: 1rem;
	}
</style>
