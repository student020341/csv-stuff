<script>
    import {goto} from "$app/navigation";
    import {ref_files} from "$lib/stores";
    import {onMount} from "svelte";
    import readXlFrom from "read-excel-file";
    import OptionGroup from "./check-group.svelte";

    const prev_page = () => {
        goto("/");
    };

    const next_page = () => {
        goto("/results");
    };

    let something = [];

    onMount(() => {
        Promise.all(
            $ref_files.map(async (file) => {
                const stuff = await readXlFrom(file);
                return {
                    name: file.name,
                    row: stuff[0],
                };
            })
        ).then(res => {
            something = res;
        });
    });
</script>

<div>
    <button on:click={() => prev_page()}>back</button>
    <button on:click={() => next_page()}>next</button>
    <h2>Select fields from each file to search values of in the target documents</h2>
    {#each something as foo}
        <OptionGroup name={foo.name} row={foo.row} />
    {/each}
</div>

