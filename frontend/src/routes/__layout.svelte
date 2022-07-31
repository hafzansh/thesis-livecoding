<script lang="ts">
import { onMount } from "svelte";

    import "../app.css"
    let ready = false
    onMount(()=> ready = true)
</script>
<div class="">
    {#if ready}
    <slot/>
    {/if}
</div>