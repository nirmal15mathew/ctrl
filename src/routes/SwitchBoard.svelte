<script>
  import { onMount } from "svelte";
  import { db, getSwitches } from "../firebase";

  import SwitchTile from "./SwitchTile.svelte";
  import AddSwitchButton from "./AddSwitchButton.svelte";
  import { getDoc, doc } from "firebase/firestore";
  import { MoreVerticalIcon } from "svelte-feather-icons";

  export let board_id;
  // for describing the layout
  let switches = [];
  let board_name = "";
  let menuOpen = false;

  onMount(async () => {
    switches = await getSwitches(board_id);

    const boardRef = doc(db, "app_layout/" + board_id);
    let results = await getDoc(boardRef);
    let data = results.data();
    console.log(switches)
    board_name = data.room_name;
  });

  function deleteBoard() {
    // remove all the switches
    // delete the document
    // change the values of currently_used property of all the pins used in this board
  }
</script>

<div class="pb-4 px-2">
  <!-- Switch Board -->
  <div class="py-2 flex justify-between">
    <!-- Board header -->
    <p class="font-bold text-sm text-gray-500">
      {board_name}
    </p>
    <div class="dropdown">
      <!-- Dropdown menu button -->
      <button
        class="text-bold text-gray-700 p-1 rounded-full hover:bg-slate-300 transition-colors"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        id="dropDownMenuButton"
        on:click={() => (menuOpen = !menuOpen)}
      >
        <MoreVerticalIcon size="1.2x" />
      </button>
      {#if menuOpen}
        <div
          class="absolute right-4 py-2 rounded bg-slate-50 text-sm font-bold text-slate-600 shadow"
          aria-labelledby="dropDownMenuButton"
        >
        <!-- Dropdown Menu -->
          <ul>
            <li class="hover:bg-slate-100 px-4 cursor-pointer" on:click={deleteBoard}>
              Delete
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </div>

  <ul class="flex gap-2 items-center">
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
      <a href={"/create/switch/" + board_id}>
        <AddSwitchButton />
      </a>
    </li>
  </ul>
</div>
