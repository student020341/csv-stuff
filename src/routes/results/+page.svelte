<script>
    import {file_contents, selections, cmp_file_contents} from "$lib/stores";
    import {onMount} from "svelte";

    onMount(() => {
        console.log($selections);
        console.log($file_contents);
        console.log($cmp_file_contents);
    });

    // TODO find files that are in / not in files based on selections
</script>

<div>
    <h2>TODO: results</h2>
</div>
