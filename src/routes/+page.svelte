<script lang="ts">
	import DropMembersList from '../components/DropMembersList.svelte';
	import { membersListStore } from '../stores/MembersListStore';
</script>

<h1 class="font-bold text-7xl text-purple-900 my-10">Favorite Sorter</h1>
<img
	alt="ภาพประกอบ"
	src="https://cdn.discordapp.com/attachments/929214297530327140/1090300157125459968/image.png?ex=658af4a6&is=65787fa6&hm=03a4becb21afad35ea2c1fc62af3ac2aa29990296a7e32cf4616a537b6605971&"
	class="h-48 mb-2"
/>
<h2 class="mb-9">ภาพประกอบ</h2>
<DropMembersList />
{#if $membersListStore.length > 0}
	<p class="text-lg mt-8">
		You've added your list! You can see it at <span class="font-bold">"All Members"</span> page
	</p>
{:else}
	<p class="text-lg mt-8">You've not added your list yet.</p>
{/if}
