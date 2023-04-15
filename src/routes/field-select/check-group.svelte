
<script>
    import {selections} from "$lib/stores";
    import {onMount} from "svelte";
    export let name="";
    export let row=[];

    onMount(() => {
        if (!$selections[name]) {
            const obj = new Array(row.length);
            for(let i = 0; i < row.length; i++) {
                obj[i] = false;
            }
            selections.update((s) => {
                s[name] = obj;
                return s;
            });
        }
    });
</script>

<div>
    <p>{name}</p>
    {#if $selections[name]}
    <div class="options">
        {#each row as option, optionIndex}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
            on:click={() => $selections[name][optionIndex] = !$selections[name][optionIndex]} 
            class="option" class:selected={$selections[name][optionIndex]}>{option}</span>
        {/each}
    </div>
    {:else}
    <p>mounting</p>
    {/if}
</div>

<style>
    .options {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .options .option {
        margin: 4px;
        padding: 4px;
        border: 1px solid white;
        border-radius: 4px;
    }
    
    .selected {
        background-color: rgb(0, 97, 0);
    }
</style>
