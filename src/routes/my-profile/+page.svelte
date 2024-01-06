<script lang="ts">
	import { onMount } from 'svelte';
	import { listsStore } from '../../stores/UserStore';
	import { userStore } from '../../stores/UserStore';
	import { initData, onSelectList, deleteList } from '$lib/utils/dataServices';
	import { goto } from '$app/navigation';
	import { selectedListStore } from '../../stores/MembersListStore';

	$: console.log($listsStore);

	onMount(() => initData());
</script>

{#if $userStore === ''}
	<h1 class="font-bold text-3xl text-purple-900 my-8 max-sm:text-5xl text-center">
		You haven't login yet!
	</h1>
	<h4 class="text-lg pb-8">Please login with your username and password to see your profile.</h4>
{:else}
	<h1 class="font-bold text-7xl text-purple-900 my-6 max-sm:text-5xl text-center">
		Welcome,
		{#if $userStore !== ''}
			{$userStore}
		{/if}
	</h1>

	<div class="grid grid-cols-3 justify-items-center">
		{#each $listsStore as list}
			<div class="flex m-4">
				<button
					class="p-4 {list.id === $selectedListStore.id
						? 'bg-red-800 hover:bg-red-900 font-bold'
						: 'bg-red-500 hover:bg-red-600'} rounded-l-xl text-white cursor-pointer text-xl flex items-center"
					on:click={() => onSelectList(list.id, $selectedListStore.id)}
				>
					{list.title}
				</button>
				<button
					class="bg-red-700 hover:bg-red-950 rounded-r-xl p-2 text-sm"
					on:click={() => deleteList(list.id)}
					><svg
						class="w-4 h-4 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 18 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
						/>
					</svg></button
				>
			</div>
		{/each}
	</div>

	<a
		class="bg-pink-500 hover:bg-pink-600 rounded-full text-white text-2xl mt-4 mb-8 px-5 py-5 cursor-pointer"
		href="/"
	>
		Add New List
	</a>
{/if}
