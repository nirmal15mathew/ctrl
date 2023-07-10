<script>
  import { CloudIcon, CloudOffIcon } from "svelte-feather-icons";
  import { getServerStatus } from "../firebase";
  import { onMount } from "svelte";

  let homeServerActive = false;
  let notificationPermission = false;

  onMount(async () => {
    homeServerActive = await getServerStatus("board01");
    notificationPermission = Notification.permission != "granted";
  });
  function askNotificationPermission() {
    function handlePermission(permission) {
      // do whatever
    }


    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
    } else {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission);
      });
    }
  }
</script>

<ul>
  <li>
    {#if homeServerActive == "active"}
      <CloudIcon size="1.3x" />
    {:else}
      <CloudOffIcon size="1.3x" />
    {/if}
  </li>
  {#if notificationPermission}
    <button on:click={askNotificationPermission}>Enable Notification</button>
  {/if}
</ul>
