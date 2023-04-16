<script>
    import { file_contents, selections, cmp_file_contents } from "$lib/stores";
    import { onMount } from "svelte";

    let results = {};

    onMount(() => {
        console.log($selections);
        console.log($file_contents);
        console.log($cmp_file_contents);

        Object.entries($file_contents).forEach(([k, v]) => {
            if (!(k in $selections) || v.length < 2) {
                return;
            }

            const fields = v[0]
                .filter((_, i) => $selections[k][i])
                .map((f) => f.toLowerCase().trim());
            if (fields.length == 0) {
                return;
            }

            // collect values from source
            for (let source_key_index = 0; source_key_index < v[0].length; source_key_index++) {
                if (!$selections[k][source_key_index]) {
                    continue;
                }
                const col_key = v[0][source_key_index].trim();
                for (let source_row_index = 1; source_row_index < v.length; source_row_index++) {
                    const val = v[source_row_index][source_key_index].toLowerCase().trim();
                    // find match in cmp docs
                    const matches = [];
                    Object.entries($cmp_file_contents).forEach(([k2, v2]) => {
                        if (v2.length < 2) {
                            return;
                        }

                        for (let cmp_key_index = 0; cmp_key_index < v2[0].length; cmp_key_index++) {
                            for (let cmp_row_index = 1; cmp_row_index < v2.length; cmp_row_index++) {
                                const cmp_val = v2[cmp_row_index][cmp_key_index].toLowerCase().trim();
                                if (val == cmp_val) {
                                    matches.push({
                                        target_key: v2[0][cmp_key_index],
                                        row: cmp_row_index,
                                        target_file: k2,
                                        source_file: k,
                                        source_key: col_key,
                                    });
                                }
                            }
                        }
                    });

                    if (!results[k]) {
                        results[k] = {};
                    }
                    if (!results[k][col_key]) {
                        results[k][col_key] = [];
                    }
                    results[k][col_key] = results[k][col_key].concat(matches);
                }
            }
        });

        console.log(results);

        Object.entries($file_contents).forEach(([k, v]) => {
            if (!results[k]) {
                console.log("no results for", k);
                return;
            }
            console.log("file", k);

            for(let i = 0;i < v[0].length;i++) {
                if ($selections[k][i]) {
                    const col_key = v[0][i].trim();
                    console.log("col", col_key);
                    const res = results[k][col_key];
                    if (res.length == 0) {
                        console.log("no matches for key", col_key);
                        continue;
                    }

                    // TODO go over each value
                    // for (const m of res) {
                    //     console.log(`found match in file ${m.target_file} on row ${m.row}`);
                    // }
                }
            }
        });
    });
</script>

<div>
    <h2>TODO: results</h2>
</div>
