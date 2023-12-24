<script lang="ts">
	import { onDrop } from '$lib/utils/listServices';
	import DropFile from 'svelte-parts/DropFile.svelte';

	let fileOver = false;
</script>

<DropFile {onDrop} onEnter={() => (fileOver = true)} onLeave={() => (fileOver = false)}>
	<div
		class={`drop-zone ${
			fileOver ? 'over' : ''
		} bg-red-500 hover:bg-red-600 rounded-2xl text-2xl cursor-pointer`}
	>
		{#if fileOver}
			<p>Drop it!</p>
		{:else}
			<p>Upload your list (.xlsx)</p>
		{/if}
	</div>
</DropFile>

<style>
	.drop-zone {
		display: grid;
		align-items: center;
		margin: auto;
		width: 300px;
		height: 100px;
		color: white;
	}
	.over {
		color: #ff3e00;
		background-color: white;
		border: #ff3e00 solid 2px;
	}
	.drop-zone p {
		text-align: center;
	}
</style>
