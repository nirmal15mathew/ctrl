<script>
  import DropMenu from "./DropMenu.svelte";

  export let menuOptions = [];
  export let defaultButtonLabel = "";
  export let selectedChoice = menuOptions[0];
  let isShown = false;

  //
  function selectChoice(option) {
    selectedChoice = option
  }
</script>

<div>
  <button>
    {selectedChoice ? selectedChoice.label : defaultButtonLabel}
  </button>

  {#if isShown}
    <div>
        {#each menuOptions as option}
            <li on:click={() => selectChoice(option)} on:keydown={() => {}}>
                <DropMenu label={option.label} tags={option.tags} />
            </li>
        {/each}
    </div>
  {/if}
</div>
