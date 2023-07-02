<script>
    export let label = "";
    export let tags = []
</script>


<div>
    <span>
        {label}
    </span>
    <span>
        {#each tags as tag}
            <Chip label={tag.label} theme={tag.theme} />
        {/each}
    </span>
</div>