<script>
    import { ref_files, cmp_files } from "$lib/stores";
    import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
    import Icon from "$lib/icon.svelte";

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
        ref_files.update((files) => {
            return [...files, ...e.detail.acceptedFiles];
        });
    };

    const handleDrop2 = (e) => {
        cmp_files.update((files) => {
            return [...files, ...e.detail.acceptedFiles];
        });
    };

    const removeSourceFile = (index) => {
        ref_files.update((files) => {
            files.splice(index, 1);
            return files;
        });
    };

    const removeTargetFile = (index) => {
        cmp_files.update((files) => {
            files.splice(index, 1);
            return files;
        });
    };
</script>

<div>
    <h1>CSV Stuff</h1>
    <h4>Source Files</h4>
    <!-- <p>Foo <Icon name="x-circle" color="#eee" /></p> -->
    <Dropzone
        on:drop={handleDrop}
        containerStyles={sourceStyleText}
        accept=""
    />
    <div class="files">
        {#each $ref_files as file, fileIndex}
            <!-- TODO make component -->
            <div class="file">
                <span>{file.name}</span>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    class="pointer"
                    on:click={() => removeSourceFile(fileIndex)}
                >
                    <Icon name="x-circle" color="red" />
                </span>
            </div>
        {/each}
    </div>

    <h4>Target Files</h4>
    <Dropzone
        on:drop={handleDrop2}
        containerStyles={targetStyleText}
        accept=""
    />
    <div class="files">
        {#each $cmp_files as file, fileIndex}
            <!-- TODO make component -->
            <div class="file">
                <span>{file.name}</span>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    class="pointer"
                    on:click={() => removeTargetFile(fileIndex)}
                >
                    <Icon name="x-circle" color="red" />
                </span>
            </div>
        {/each}
    </div>
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
