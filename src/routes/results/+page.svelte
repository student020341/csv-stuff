<script>
    import {goto} from "$app/navigation";

    const prev_page = () => {
        goto("/field-select");
    };
</script>

<div>
    <button on:click={() => prev_page()}>back</button>
    <h2>TODO: results</h2>
</div>
