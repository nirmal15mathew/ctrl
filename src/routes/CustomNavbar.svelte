<script>
  import { page } from "$app/stores"
  import { BarChart2Icon, UsersIcon, GridIcon } from "svelte-feather-icons";
  const activeClasses = "text-blue-800 font-semibold"

  // menu options listed
  let menu = [
    {
        icon: GridIcon,
        route: '/'
    },
    {
        icon: BarChart2Icon,
        route: '/activity'
    },
    {
        icon: UsersIcon,
        route: '/account'
    }
  ]

</script>

<div class="bg-slate-100 px-2 py-4 w-screen shadow">
  <!-- Navbar on the bottom -->
  <ul class="flex text-slate-600 w-full justify-around">
    {#each menu as menuOption}
        <a href={menuOption.route}>
          <li class={$page.route.id == menuOption.route ? activeClasses: ""}>
            <svelte:component this={menuOption.icon} size="1.7x" />
        </li>
        </a>
    {/each}
  </ul>
</div>
