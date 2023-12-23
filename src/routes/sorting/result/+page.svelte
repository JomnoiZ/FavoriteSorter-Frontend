<script lang="ts">
	import { sortByRank } from '$lib/utils/rankedlistServices';
	import { rankedMembersListStore } from '../../../stores/SortedListStore';

	sortByRank();
</script>

<h1 class="font-bold text-5xl mt-10 text-purple-900">Ranking List</h1>
<h2 class="mt-5 text-2xl">There are {$rankedMembersListStore.length} members.</h2>
<ol class="flex flex-col items-center">
	{#each $rankedMembersListStore as member}
		<li class="my-5 text-xl flex flex-col items-center">
			{#if member.Data.Image != ''}
				<img alt={`รูปของ${member.Data.Name}`} src={member.Data.Image} />
			{/if}
			{$rankedMembersListStore.length - member.Rank}. {member.Data.Name}
		</li>
	{/each}
</ol>
