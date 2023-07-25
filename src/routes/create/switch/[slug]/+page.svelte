<script lang="js">
  import { fade, fly } from "svelte/transition";
  import { addSwitch, db } from "../../../../firebase";
  import {
    query,
    collection,
    where,
    getDocs,
    doc,
    updateDoc
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { page } from "$app/stores"
  import { goto } from "$app/navigation"
  

  let isDigital;
  let switchLabel = "";
  let pinNumber = 0;
  let availablePins = []; // from 2 to 26

  async function getAvailablePins(board_id) {
    const pin_query = query(
      collection(db, board_id),
      where("currently_used", "==", false)
    );

    const query_snap = await getDocs(pin_query);
    query_snap.forEach((q_doc) => {
      availablePins.push(q_doc)
    })
    availablePins = availablePins
  }

  onMount(async () => getAvailablePins("board01"))

  function markAsUsed(boardId, pin) {
    const ref = doc(db, boardId+"/"+pin)
    updateDoc(ref, {
      currently_used: true
    })
  }

  function createSwitch() {
    //markAsUsed("board01", pinNumber)
    addSwitch($page.params.slug, switchLabel, pinNumber, isDigital, "board01", "none")
    goto("/")
    const notif = new Notification("Added new switch")

  }
</script>

<svelte:head>
  <title>Add Switch</title>
</svelte:head>
<div class="p-2">
  <form class="flex flex-col">
    <!--dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500-->
    <div class="mb-6">
      <input
        type="name"
        id="label"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Label (eg: Ceiling Fan )"
        required
        bind:value={switchLabel}
      />
    </div>
    <!-- Switch between binary and analog -->
    <label class="relative inline-flex items-center mb-4 cursor-pointer">
      <input
        type="checkbox"
        value=""
        class="sr-only peer"
        bind:checked={isDigital}
      />
      <div
        class="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      />
      <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {#if isDigital}
          <p transition:fade={{ duration: 100 }}>Digital</p>
        {:else}
          <p transition:fade={{ duration: 100 }}>Analog</p>
        {/if}
      </span>
    </label>

    <label for="pins">
      Select Pin
    </label>
    <select bind:value={pinNumber}>
      {#each availablePins as pin}
        <option value={pin.id}>
          {pin.id}
        </option>
      {/each}
    </select>
    

    <button
      on:click={createSwitch}
      class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 my-2"
      >Add New Button</button
    >
  </form>
</div>
