<script>
  import { PlusIcon } from "svelte-feather-icons";
  export let buttonAction = () => {};

  function doAction() {
    buttonAction();
  }
</script>

<button
  class="fixed bottom-[4.2rem] right-4 bg-slate-700 text-white p-4 rounded-lg z-20 shadow"
  on:click={doAction}
>
  <PlusIcon size="1.7x" />
</button>
