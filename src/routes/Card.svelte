<script>
    export let label;
</script>
<div class="p-4 bg-slate-100 shadow rounded-lg min-w-max transition-colors">
    <header class="text-slate-800 font-semibold mb-4">
        {label}
    </header>
    <main>
        <slot></slot>
    </main>
</div>