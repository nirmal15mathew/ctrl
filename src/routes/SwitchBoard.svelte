<script>
  import { onMount } from "svelte";
  import { db, getSwitches, deleteBoard } from "../firebase";

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
    board_name = data.room_name;
  });

  // function deletes all the switches and delete the board document
  function deleteBoardLocal() {
    deleteBoard(board_id)
  }
</script>

<div class="p-4 bg-slate-100 rounded-lg">
  <!-- Switch Board -->
  <div class="pb-1 flex justify-between">
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
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li class="hover:bg-slate-100 px-4 cursor-pointer" on:click={deleteBoardLocal}>
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
