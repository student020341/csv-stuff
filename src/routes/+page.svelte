<script>
    import { onMount } from "svelte";
    import {ref_files} from "$lib/stores";
    import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
    import Icon from "$lib/icon.svelte";
    import {goto} from "$app/navigation";

    let sourceFiles = [];
    let targetFiles = [];

    let sourceStyleText = `
        color: #00c300;
        font-size: 22px;
        background-color: #222;
    `;

    let targetStyleText = `
        color: #ff8686;
        font-size: 22px;
        background-color: #222;
    `;

    const handleDrop = (e) => {
        sourceFiles = Array.from(
            new Set([...sourceFiles, ...e.detail.acceptedFiles])
        );
    };

    const handleDrop2 = (e) => {
        targetFiles = Array.from(
            new Set([...targetFiles, ...e.detail.acceptedFiles])
        );
    };

    const removeSourceFile = (index) => {
        sourceFiles = sourceFiles.filter((_, i) => i !== index);
    };

    const next_page = () => {
        ref_files.set(sourceFiles);
        // navigate to field selection page
        goto("/field-select");
    };

    onMount(() => {
        sourceFiles = $ref_files;
    });
</script>

<div>
    <h1>CSV Stuff</h1>
    <button on:click={() => next_page()}>Next</button>
    <h4>Source Files</h4>
    <!-- <p>Foo <Icon name="x-circle" color="#eee" /></p> -->
    <Dropzone on:drop={handleDrop} containerStyles={sourceStyleText} accept="" />
    <div class="files">
        {#each sourceFiles as file, fileIndex}
            <!-- TODO make component -->
            <div class="file">
                <span>{file.name}</span>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class="pointer" on:click={() => removeSourceFile(fileIndex)}>
                    <Icon name="x-circle" color="red" />
                </span>
            </div>
        {/each}
    </div>

    <h4>Target Files</h4>
    <Dropzone on:drop={handleDrop2} containerStyles={targetStyleText} accept="" />
    <!-- {#each targetFiles as file}
        <p>{file.name}</p>
    {/each} -->
</div>

<style>
    .files {
        display: flex;
        flex-wrap: wrap;
        color: black;
    }

    .file {
        display: inline-flex;
        border: 2px solid black;
        margin: 4px;
        padding: 4px;
        align-items: center;
        background-color: rgb(189, 189, 189);
    }
    .file span {
        display: inline-block;
        vertical-align: bottom;
        margin-right: 4px;
    }

    .pointer {
        cursor: pointer;
    }
</style>
