<script>
  import { CloudIcon, CloudOffIcon } from "svelte-feather-icons";
  import {getServerStatus} from "../firebase"
  import { onMount } from "svelte";


  let homeServerActive = false

  onMount(
    async () => {
      homeServerActive = await getServerStatus("board01")
    }
  )
</script>
<ul>
    <li>
        {#if homeServerActive == "active"}
        <CloudIcon size="1.3x"/>
        {:else}
        <CloudOffIcon size="1.3x" />
        {/if}
    </li>
</ul>