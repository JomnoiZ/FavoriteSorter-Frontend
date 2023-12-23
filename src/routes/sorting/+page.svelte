<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';
	import {
		rankedMembersListStore,
		uncomparedMembersStore,
		winningTable
	} from '../../stores/SortedListStore';
	import { membersListStore } from '../../stores/MembersListStore';
	import { onReset, onCompare, randomPair, getProgress } from '$lib/utils/rankedListServices';
	import Card from '../../reusable/Card.svelte';

	$: n = $membersListStore.length;
	$: m = $uncomparedMembersStore.length;
	$: allPair = n * (n - 1);
	$: progress = getProgress(allPair, $uncomparedMembersStore);
	$: currentPair = randomPair($uncomparedMembersStore);

	$: console.log($rankedMembersListStore, $uncomparedMembersStore, $winningTable);
</script>

<button
	class="bg-red-500 rounded-xl text-white text-3xl mb-5 mt-10 px-5 py-5 cursor-pointer"
	on:click={() => onReset($membersListStore)}>Start sorting</button
>
<Progressbar
	{progress}
	animate
	precision={2}
	labelOutside="Current progress="
	labelInside
	tweenDuration={1500}
	easing={sineOut}
	size="h-12"
	labelInsideClass="bg-blue-500 text-blue-100 text-base font-medium text-center p-4 leading-none rounded-full"
	class="w-96 bg-blue-900"
/>

<div class="flex gap-12 mt-9">
	{#if m > 0 && currentPair[0] != -1}
		<Card>
			<button
				on:click={() => {
					onCompare(currentPair[0], currentPair[1], $winningTable);
				}}
			>
				{#if $rankedMembersListStore[currentPair[0]].Data.Image != ''}
					<img
						alt={`รูปของ${$rankedMembersListStore[currentPair[0]].Data.Name}`}
						src={$rankedMembersListStore[currentPair[0]].Data.Image}
					/>
				{/if}
				<h1 class="text-xl">{$rankedMembersListStore[currentPair[0]].Data.Name}</h1>
			</button>
		</Card>
		<Card>
			<button
				class="flex flex-col items-center"
				on:click={() => {
					onCompare(currentPair[1], currentPair[0], $winningTable);
				}}
			>
				{#if $rankedMembersListStore[currentPair[1]].Data.Image != ''}
					<img
						alt={`รูปของ${$rankedMembersListStore[currentPair[1]].Data.Name}`}
						src={$rankedMembersListStore[currentPair[1]].Data.Image}
					/>
				{/if}
				<h1 class="text-xl">
					{$rankedMembersListStore[currentPair[1]].Data.Name}
				</h1>
			</button>
		</Card>
	{:else if m > 0}
		<div class="flex flex-col items-center">
			<h1 class="text-2xl">You've completed ranking your members list!!!</h1>
			<a
				href="/sorting/result"
				class="bg-red-500 rounded-xl text-white text-3xl mb-5 mt-5 px-5 py-5 cursor-pointer"
				>See the result</a
			>
		</div>
	{/if}
</div>
