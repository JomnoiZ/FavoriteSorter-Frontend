<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';
	import {
		rankedMembersListStore,
		uncomparedMembersStore,
		winningTable
	} from '../../stores/SortedListStore';
	import { membersListStore, selectedListStore } from '../../stores/MembersListStore';
	import { onReset, onCompare, randomPair, getProgress } from '$lib/utils/rankedListServices';
	import Card from '../../reusable/Card.svelte';
	import { onMount } from 'svelte';
	import { initData } from '$lib/utils/dataServices';
	import { userStore } from '../../stores/UserStore';

	$: n = $membersListStore.length;
	$: m = $uncomparedMembersStore.length;
	$: allPair = n * (n - 1);
	$: progress = getProgress(allPair, $uncomparedMembersStore, $selectedListStore.id);
	$: currentPair = randomPair($uncomparedMembersStore);

	$: console.log(
		n,
		m,
		$membersListStore,
		$rankedMembersListStore,
		$uncomparedMembersStore,
		$winningTable
	);

	onMount(() => {
		if ($userStore !== '') initData();
	});
</script>

<h1 class="font-bold text-5xl m-8 text-purple-900 text-center">
	{$selectedListStore.title}
</h1>
<button
	class="bg-red-500 hover:bg-red-600 rounded-xl text-white text-3xl mb-5 px-5 py-5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
	disabled={n === 0}
	on:click={() => onReset($membersListStore, $selectedListStore.id)}
>
	{#if m === 0}
		Start sorting
	{:else}
		Restart sorting
	{/if}
</button>
<p class="text-xl pb-2">Current Progress</p>
<Progressbar
	{progress}
	animate
	precision={2}
	labelInside
	tweenDuration={1500}
	easing={sineOut}
	size="h-12"
	labelInsideClass="bg-blue-500 text-white text-base font-medium text-center p-4 leading-none rounded-full"
	class="w-96 bg-blue-900"
/>

<div class="flex gap-12 my-6 max-sm:flex-col">
	{#if m > 0 && currentPair[0] !== -1}
		<Card>
			<button
				on:click={() => {
					onCompare(currentPair[0], currentPair[1], $winningTable, $selectedListStore.id);
				}}
			>
				{#if $rankedMembersListStore[currentPair[0]].data.image !== ''}
					<img
						alt={`รูปของ${$rankedMembersListStore[currentPair[0]].data.name}`}
						src={$rankedMembersListStore[currentPair[0]].data.image}
					/>
				{/if}
				<h1 class="text-xl">1. {$rankedMembersListStore[currentPair[0]].data.name}</h1>
			</button>
		</Card>
		<Card>
			<button
				class="flex flex-col items-center"
				on:click={() => {
					onCompare(currentPair[1], currentPair[0], $winningTable, $selectedListStore.id);
				}}
			>
				{#if $rankedMembersListStore[currentPair[1]].data.image !== ''}
					<img
						alt={`รูปของ${$rankedMembersListStore[currentPair[1]].data.name}`}
						src={$rankedMembersListStore[currentPair[1]].data.image}
					/>
				{/if}
				<h1 class="text-xl">2. {$rankedMembersListStore[currentPair[1]].data.name}</h1>
			</button>
		</Card>
	{:else if m > 0}
		<div class="flex flex-col items-center">
			<h1 class="text-2xl mb-5">You've completed ranking your members list!!!</h1>
			<a
				href="/sorting/result"
				class="bg-red-500 hover:bg-red-600 rounded-xl text-white text-3xl px-5 py-5 cursor-pointer"
				>See the result</a
			>
		</div>
	{/if}
</div>
