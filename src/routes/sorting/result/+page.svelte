<script lang="ts">
	import Card from '../../../reusable/Card.svelte';
	import { selectedListStore } from '../../../stores/MembersListStore';
	import { rankedMembersListStore } from '../../../stores/SortedListStore';
</script>

<h1 class="font-bold text-5xl my-6 text-purple-900 text-center">
	Ranking List of "{$selectedListStore.title}"
</h1>
<h2 class="text-2xl">There are {$rankedMembersListStore.length} members.</h2>
<ol class="flex flex-col items-center gap-12 my-6">
	{#each $rankedMembersListStore as member}
		<Card>
			<li class="text-xl flex flex-col items-center">
				{#if member.data.image != ''}
					<img alt={`รูปของ${member.data.name}`} src={member.data.image} />
				{/if}
				{$rankedMembersListStore.length - member.rank}. {member.data.name}
			</li>
		</Card>
	{/each}
</ol>
