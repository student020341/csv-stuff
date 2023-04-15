<script>
    import { ref_files, selections, file_contents, cmp_files, cmp_file_contents } from "$lib/stores";
    import { onMount } from "svelte";
    import readXlFrom from "read-excel-file";
    import OptionGroup from "./check-group.svelte";

    let field_sets = [];

    onMount(() => {

        // get target file contents
        Promise.all(
            $cmp_files.map(async (file) => {
                const stuff = await readXlFrom(file);
                return {
                    name: file.name,
                    rows: stuff,
                };
            })
        ).then(res => {
            cmp_file_contents.update(s => {
                for (let file of res) {
                    s[file.name] = file.rows;
                }
                return s;
            });
        });

        // get source file contents
        Promise.all(
            $ref_files.map(async (file) => {
                const stuff = await readXlFrom(file);
                return {
                    name: file.name,
                    rows: stuff,
                };
            })
        ).then((res) => {
            // update field sets
            field_sets = res.map((row) => ({
                name: row.name,
                row: row.rows.length > 0 ? row.rows[0] : [],
            }));

            // remove selections that may no longer be in fields, ex if a file was removed
            selections.update((s) => {
                for (let key in s) {
                    if (!field_sets.some((obj) => obj.name === key)) {
                        delete s[key];
                    }
                }
                return s;
            });

            // set file contents
            file_contents.update((s) => {
                for (let file of res) {
                    s[file.name] = file.rows;
                }
                return s;
            });
        });
    });
</script>

<div>
    <h2>
        Select fields from each file to search values of in the target documents
    </h2>
    {#each field_sets as obj}
        <OptionGroup name={obj.name} row={obj.row} />
    {/each}
</div>
