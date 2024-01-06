<script lang="ts">
	import EditData from '../../components/EditData.svelte';
	import Card from '../../reusable/Card.svelte';
	import { selectedListStore, membersListStore } from '../../stores/MembersListStore';
</script>

<div class="flex my-6 items-center">
	<h1 class="font-bold text-5xl text-purple-900 text-center">
		Members List of "{$selectedListStore.title}"
	</h1>
	<EditData />
</div>
<h2 class="text-2xl text-center">
	{#if $membersListStore.length === 0}
		Please upload your members list.
	{:else}
		There are {$membersListStore.length} members.
	{/if}
</h2>
<ol class="grid grid-cols-3 place-content-around gap-12 m-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
	{#each $membersListStore as member}
		<Card>
			<li class="text-xl flex flex-col items-center">
				{#if member.image != ''}
					<img alt={`รูปของ${member.name}`} src={member.image} class="h-68" />
				{/if}
				{member.name}
			</li>
		</Card>
	{/each}
</ol>
