<script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../../../firebase";
  let roomLabel = "";

  let labelEmpty = false

  function spawnError() {
    // in the future this can be used to spawn an error dialog or snackbar
    labelEmpty = true

  }

  async function createNewRoom() {
    if (roomLabel != "") {
      const ref = collection(db, "app_layout");
      await addDoc(ref, {
        "board-type": "switch-board",
        room_name: roomLabel,
      });
    }
    else {
        spawnError()
    }
  }
</script>

<div class="p-2">
  <form class="flex flex-col">
    <input type="text" bind:value={roomLabel} placeholder="Kitchen" class="px-2 py-1 rounded"/>
    {#if labelEmpty}
    <span class="text-red-600 p-1">
      Room name cannot be empty
  </span>
    {/if}
    <button on:click={() => createNewRoom()} class="p-2 rounded bg-slate-700 text-white my-2 focus:ring-slate-500"> Create </button>
  </form>
</div>
