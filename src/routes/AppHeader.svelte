<script>
    export let title;
    export let nav;
</script>

<div class="p-4">
    <nav class="flex justify-between">
        <figure class="font-semibold text-3xl text-slate-800">
            {title}
        </figure>

        <div>
            <svelte:component this={nav} />
        </div>
    </nav>
</div>