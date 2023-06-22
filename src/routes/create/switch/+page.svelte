<script>
    import {fade, fly} from "svelte/transition"
  import { db } from "../../../firebase";
  import { setDoc, doc } from "firebase/firestore";

  let isDigital;

  function editSwitch() {
    // using setDoc add a new document or use the existing document of switch for editing the
    // switch for which doc is used. USAGE: doc(db, "app_layout/roomId", "switchId")
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
      />
    </div>
    <!-- Switch between binary and analog -->
    <label class="relative inline-flex items-center mb-4 cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" bind:checked={isDigital}>
        <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {#if isDigital}
            <p transition:fade="{{ duration: 100 }}">Digital</p>
            {:else}
            <p transition:fade="{{ duration: 100 }}">Analog</p>
            {/if}
        </span>
      </label>      
      
      <button type="submit" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Add New Button</button>
  </form>
</div>
