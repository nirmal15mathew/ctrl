<script>
	import CustomNavbar from "./CustomNavbar.svelte"
	import AppHeader from "./AppHeader.svelte";
	import StatusBar from "./StatusBar.svelte";
	import '../app.css'
</script>

<div class="app h-screen bg-gray-200 font-sans select-none">
	<header>
		<AppHeader title="Ctrl." nav={StatusBar}/>
	</header>
	<main>
		<slot />
	</main>

	<footer class="bottom-0 fixed">
		<CustomNavbar />
	</footer>
</div>