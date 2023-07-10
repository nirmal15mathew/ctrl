<script>
    import { onMount } from 'svelte';
    let menu;
    let show = false;
    let x;
    let y;
  
    const handleClick = (event) => {
      if (event.target !== menu) {
        show = false;
      }
    };
  
    const handleContextMenu = (event) => {
      event.preventDefault();
      x = event.clientX;
      y = event.clientY;
      show = true;
    };
  
    onMount(() => {
      window.addEventListener('click', handleClick);
      window.addEventListener('contextmenu', handleContextMenu);
      return () => {
        window.removeEventListener('click', handleClick);
        window.removeEventListener('contextmenu', handleContextMenu);
      };
    });
  </script>
  
  <svelte:head>
    <style>
      .context-menu {
        position: absolute;
        display: none;
        z-index: 1;
        padding: 0.5rem 0;
        background-color: white;
        border-radius: 0.25rem;
        box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
      }
      .context-menu.show {
        display: block;
      }
      .context-menu-item {
        display: block;
        padding: 0.25rem 1rem;
        cursor: pointer;
      }
      .context-menu-item:hover {
        background-color: #f1f1f1;
      }
    </style>
  </svelte:head>
  
  <div
    bind:this={menu}
    class="context-menu"
    class:show
    style="top: {y}px; left: {x}px;"
  >
    <slot />
  </div>
  
  