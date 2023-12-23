<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
</script>

<head>
	<title>Favorite Sorter</title>
</head>

<div class="bg-orange-600 text-white py-4 w-full">
	<nav>
		<ul class="flex justify-end gap-3 px-8 text-lg">
			<li class="px-6"><a href="/">Home</a></li>
			<li class="px-6"><a href="/sorting">Sort</a></li>
			<li class="px-6"><a href="/all-members">All Members</a></li>
		</ul>
	</nav>
</div>

<body class="bg-amber-200 flex flex-col items-center justify-between">
	<slot />
</body>

<Footer />
