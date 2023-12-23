<script lang="ts">
	import { membersListStore } from '../../stores/MembersListStore';
</script>

<h1 class="font-bold text-5xl mt-10 text-purple-900">Members List</h1>
<h2 class="mt-5 text-2xl">There are {$membersListStore.length} members.</h2>
<ol class="grid grid-cols-3 place-content-around gap-4">
	{#each $membersListStore as member}
		<li class="my-5 text-xl flex flex-col items-center">
			{#if member.Image != ''}
				<img alt={`รูปของ${member.Name}`} src={member.Image} />
			{/if}
			{member.Name}
		</li>
	{/each}
</ol>
