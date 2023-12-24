<script lang="ts">
	import DropMembersList from '../components/DropMembersList.svelte';
	import { membersListStore } from '../stores/MembersListStore';
</script>

<h1 class="font-bold text-7xl text-purple-900 my-6 max-sm:text-5xl text-center">Favorite Sorter</h1>
<img alt="ภาพประกอบ" src="../src/assets/images/buttonMeme.png" class="h-96 mb-4" />
<DropMembersList />
{#if $membersListStore.length > 0}
	<p class="text-lg my-4 text-center">
		You've added your list! You can see it at <span class="font-bold">"All Members"</span> page
	</p>
{:else}
	<p class="text-lg my-4 text-center">You've not added your list yet.</p>
{/if}
