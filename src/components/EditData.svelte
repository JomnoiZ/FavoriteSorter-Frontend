<script lang="ts">
	import { selectedListStore } from '../stores/MembersListStore';
	import Modal from 'svelte-parts/Modal.svelte';
	import { editTitle } from '$lib/utils/dataServices';

	let editing = false;
	let title = $selectedListStore.title;
</script>

<button
	class="bg-red-500 hover:bg-red-600 rounded-xl text-white text-2xl ml-8 py-3 px-5 cursor-pointer inline-flex items-center disabled:opacity-50 disabled:pointer-events-none"
	disabled={$selectedListStore.id === 'n/a'}
	on:click={() => (editing = true)}
	>Edit <svg
		class="ml-2 w-5 h-5 text-gray-800 dark:text-white"
		aria-hidden="true"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 20 20"
	>
		<path
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M15 17v1a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2M6 1v4a1 1 0 0 1-1 1H1m13.14.772 2.745 2.746M18.1 5.612a2.086 2.086 0 0 1 0 2.953l-6.65 6.646-3.693.739.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"
		/>
	</svg></button
>

<Modal
	open={editing}
	onClose={() => {
		editing = false;
	}}
>
	<div class="bg-yellow-200 p-12 rounded-2xl">
		<div class="flex flex-col items-center text-purple-900">
			<div class="flex m-4 items-center">
				<h2 class="text-2xl font-bold mr-4">Title :</h2>
				<input class="p-2 rounded-lg" bind:value={title} autofocus />
			</div>
			<button
				class="bg-red-500 hover:bg-red-600 rounded-xl text-white text-2xl mt-4 mx-4 py-3 px-5 cursor-pointer inline-flex items-center disabled:opacity-50 disabled:pointer-events-none"
				disabled={title === $selectedListStore.title}
				on:click={() => {
					editTitle($selectedListStore.id, title);
					editing = false;
				}}>Edit Title</button
			>
		</div>
	</div>
</Modal>
