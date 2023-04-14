
<script>
    import {onMount} from "svelte";
    export let name="";
    export let row=[];

    let selected = {};
    onMount(() => {
        for(let i = 0; i < row.length; i++) {
            selected[i] = false;
        }
    });
</script>

<div>
    <p>{name}</p>
    <div class="options">
        {#each row as option, optionIndex}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
            on:click={() => selected[optionIndex] = !selected[optionIndex]} 
            class="option" class:selected={selected[optionIndex]}>{option}</span>
        {/each}
    </div>
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
