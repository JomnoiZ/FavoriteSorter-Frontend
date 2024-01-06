<script lang="ts">
	import { onLogout } from '$lib/utils/dataServices';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Login from '../components/Login.svelte';
	import { userStore } from '../stores/UserStore';
</script>

<head>
	<title>Favorite Sorter</title>
</head>

<div class="bg-orange-600 text-white py-4 w-full">
	<nav>
		<ul class="flex justify-end gap-3 px-8 max-sm:px-4 text-lg max-sm:text-base">
			<li class="px-6 max-sm:px-4"><a href="/">Home</a></li>
			<li class="px-6 max-sm:px-4"><a href="/sorting">Sort</a></li>
			<li class="px-6 max-sm:px-4"><a href="/all-members">All Members</a></li>
			{#if $userStore === '' || $userStore === 'null'}
				<li class="px-6 max-sm:px-4"><Login /></li>
			{:else}
				<li class="px-6 max-sm:px-4"><a href="/my-profile">My Profile</a></li>
				<li class="px-6 max-sm:px-4">
					<button on:click={() => onLogout()}>Logout</button>
				</li>
			{/if}
		</ul>
	</nav>
</div>

<body class="bg-amber-200 flex flex-col items-center">
	<slot />
</body>

<Footer />
