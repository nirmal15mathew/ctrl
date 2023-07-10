<script>
  import { onDestroy, onMount } from "svelte";
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { db } from "../firebase";

  export let iconName = "";
  export let label = "";
  export let tile_id = "";

  let icon;
  let switchData = {
    value: 0
  }
  let unsub = () => {};

  // when the component is mounted with a function will be evoked with every change in database
  onMount(
    () =>
      (unsub = onSnapshot(doc(db, "board01", tile_id), (doc) => {
        switchData = doc.data()
      }))
  );
  onDestroy(() => unsub()); // garbage collection

  async function tilePressed() {
    switchData.value = switchData.value == 0 ? 1 : 0
    await setDoc(doc(db, "board01", tile_id), switchData)
  }
</script>

<style>
  .on {
    @apply bg-slate-500 rounded p-2 text-white transition-colors font-semibold w-20 text-ellipsis;
  }
  .off {
    @apply bg-slate-300 rounded p-2 text-slate-700 transition-colors font-semibold w-20 text-ellipsis;
  }
</style>

<button
  class={switchData.value ? "on" : "off"}
  on:click={tilePressed}
>
  <section>
    {#if iconName != ""}
      <svelte:component this={icon} />
    {/if}
  </section>
  <section>
    {label}
  </section>
</button>
