<script lang="ts">
	import { onRegister } from '$lib/utils/dataServices';
	import Modal from 'svelte-parts/Modal.svelte';

	let openModal = false;

	let username = '';
	let password = '';
	let password2 = '';
</script>

<button
	class="font-bold"
	on:click={() => {
		openModal = true;
	}}
>
	Register
</button>

<Modal
	open={openModal}
	onClose={() => {
		openModal = false;
	}}
>
	<div class="bg-yellow-200 p-12 rounded-2xl">
		<div class="flex flex-col text-purple-900">
			<h1 class="mb-8 text-5xl font-bold text-center">Register to Favorite Sorter</h1>
			<div class="grid grid-cols-2 my-4 items-center">
				<h2 class="text-2xl font-bold mx-4">Username :</h2>
				<input class="p-2 rounded-lg" bind:value={username} autofocus />
			</div>
			<div class="grid grid-cols-2 items-center">
				<h2 class="text-2xl font-bold mx-4">Password :</h2>
				<input class="p-2 rounded-lg" type="password" bind:value={password} />
			</div>
			<div class="grid grid-cols-2 my-4 items-center">
				<h2 class="text-2xl font-bold mx-4">Confirm Password :</h2>
				<input class="p-2 rounded-lg" type="password" bind:value={password2} />
			</div>
			<button
				class="bg-red-500 hover:bg-red-600 rounded-xl text-white text-2xl m-4 px-5 py-5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
				on:click={async () => onRegister(username, password, password2)}
			>
				Register
			</button>
		</div>
	</div>
</Modal>
