<script>
  import { onMount } from "svelte";
  import { getSwitches } from "../firebase";

  import SwitchTile from "./SwitchTile.svelte";
  import AddSwitchButton from "./AddSwitchButton.svelte";

  export let board_id;
  // for describing the layout
  let switches = [];

  onMount(async () => switches = await getSwitches(board_id))

</script>

<div class="p-4">
  <ul class="flex gap-2">
    {#each switches as tile}
      <li>
        {#if tile.type == "BINARY"}
          <SwitchTile
            iconName={tile.icon}
            label={tile.label}
            tile_id={tile.mappedPin}
          />
        {/if}
      </li>
    {/each}
    <li>
      <a href="/create/switch">
        <AddSwitchButton />
      </a>
    </li>
  </ul>
</div>
