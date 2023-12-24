<script lang="ts">
	import Card from '../../reusable/Card.svelte';
	import { membersListStore } from '../../stores/MembersListStore';
</script>

<h1 class="font-bold text-5xl my-6 text-purple-900 text-center">Members List</h1>
<h2 class="text-2xl text-center">
	{#if $membersListStore.length === 0}
		Please upload your members list.
	{:else}
		There are {$membersListStore.length} members.
	{/if}
</h2>
<ol class="grid grid-cols-3 place-content-around gap-12 my-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
	{#each $membersListStore as member}
		<Card>
			<li class="text-xl flex flex-col items-center">
				{#if member.Image != ''}
					<img alt={`รูปของ${member.Name}`} src={member.Image} class="h-68" />
				{/if}
				{member.Name}
			</li>
		</Card>
	{/each}
</ol>
