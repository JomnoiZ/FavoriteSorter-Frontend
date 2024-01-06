<script lang="ts">
	import Modal from 'svelte-parts/Modal.svelte';
	import Register from './Register.svelte';
	import { goto } from '$app/navigation';
	import { onLogin } from '$lib/utils/dataServices';

	let openModal = false;

	let username = '';
	let password = '';
</script>

<button
	on:click={() => {
		openModal = true;
	}}
>
	Login
</button>

<Modal
	open={openModal}
	onClose={() => {
		openModal = false;
	}}
>
	<div class="bg-yellow-200 p-12 rounded-2xl">
		<div class="flex flex-col text-purple-900">
			<h1 class="mb-8 text-4xl font-bold text-center">Login into Favorite Sorter</h1>
			<div class="grid grid-cols-2 my-4 items-center">
				<h2 class="text-2xl font-bold mx-4">Username :</h2>
				<input class="p-2 rounded-lg" bind:value={username} autofocus />
			</div>
			<div class="grid grid-cols-2 mb-4 items-center">
				<h2 class="text-2xl font-bold mx-4">Password :</h2>
				<input class="p-2 rounded-lg" type="password" bind:value={password} />
			</div>
			<button
				class="bg-red-500 hover:bg-red-600 rounded-xl text-white text-2xl m-4 px-5 py-5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
				on:click={async () => onLogin(username, password)}
			>
				Login
			</button>
			<div class="flex justify-center">
				<h2 class="text-center my-4 mr-2">Don't have an account?</h2>
				<Register />
			</div>
		</div>
	</div>
</Modal>
