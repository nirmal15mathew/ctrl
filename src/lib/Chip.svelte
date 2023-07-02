<script>
    export let label;
    export let theme;
</script>

<style>
.chip {
    @apply px-2 py-1 rounded-md text-sm;
}
.red {

}
.green {

}
.blue {
    
}
</style>

<div class={`chip + {theme}`}>
    {label}
</div>