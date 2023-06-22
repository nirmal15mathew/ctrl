<script>
  import { onMount } from "svelte";
  import { getLayout } from "../firebase"

  import Card from "./Card.svelte";
  import SwitchBoard from "./SwitchBoard.svelte";
  import Fab from "../lib/FAB.svelte";

	let layout = [];


	onMount(async () => layout = await getLayout())
</script>
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home Remote Control" />
</svelte:head>

<section class="p-2">
	<Fab />
	<div class="flex flex-wrap gap-4 flex-col">
		{#each layout as el}
			{#if el['board-type'] == "switch-board"}
			<SwitchBoard board_id={el.id} />
			{/if}
		{/each}
	</div>
</section>