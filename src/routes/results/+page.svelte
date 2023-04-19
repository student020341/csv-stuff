<script>
    import { file_contents, selections, cmp_file_contents } from "$lib/stores";
    import { onMount } from "svelte";

    let results = {};

    onMount(() => {
        let data = {};

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
            for (
                let source_key_index = 0;
                source_key_index < v[0].length;
                source_key_index++
            ) {
                if (!$selections[k][source_key_index]) {
                    continue;
                }
                const col_key = v[0][source_key_index].trim();
                for (
                    let source_row_index = 1;
                    source_row_index < v.length;
                    source_row_index++
                ) {
                    const val = v[source_row_index][source_key_index]
                        .toLowerCase()
                        .trim();
                    // find match in cmp docs
                    const matches = [];
                    Object.entries($cmp_file_contents).forEach(([k2, v2]) => {
                        if (v2.length < 2) {
                            return;
                        }

                        for (
                            let cmp_key_index = 0;
                            cmp_key_index < v2[0].length;
                            cmp_key_index++
                        ) {
                            for (
                                let cmp_row_index = 1;
                                cmp_row_index < v2.length;
                                cmp_row_index++
                            ) {
                                const cmp_val = v2[cmp_row_index][cmp_key_index]
                                    .toString()
                                    .toLowerCase()
                                    .trim();
                                if (val == cmp_val) {
                                    matches.push({
                                        target_key: v2[0][cmp_key_index],
                                        row: cmp_row_index,
                                        target_file: k2,
                                        source_file: k,
                                        source_key: col_key,
                                        value: val,
                                    });
                                }
                            }
                        }
                    });

                    if (!data[k]) {
                        data[k] = {};
                    }
                    if (!data[k][col_key]) {
                        data[k][col_key] = [];
                    }
                    data[k][col_key] = data[k][col_key].concat(matches);
                }
            }
        });

        Object.entries($file_contents).forEach(([k, v]) => {
            if (!data[k]) {
                console.log("no results for", k);
                return;
            }
            results[k] = [];

            for (let i = 0; i < v[0].length; i++) {
                if ($selections[k][i]) {
                    const col_key = v[0][i].trim();
                    const res = data[k][col_key];

                    // iterate source rows
                    for (
                        let source_row_index = 1;
                        source_row_index < v.length;
                        source_row_index++
                    ) {
                        const val = v[source_row_index][i].toLowerCase().trim();
                        let res_matches = [];
                        // iterate matches
                        for (const m of res) {
                            if (m.value == val) {
                                res_matches.push(m);
                            }
                        }
                        results[k] = results[k].concat({
                            file: k,
                            key: col_key,
                            value: val,
                            matches: res_matches,
                        });
                    }
                }
            }
        });

        // sort results
        Object.keys(results).forEach((k) => {
            results[k].sort((a, b) => {
                // sort by key
                if (a.key < b.key) {
                    return -1;
                }
                if (a.key > b.key) {
                    return 1;
                }

                // sort by matches by least to most, but push down if matches is exactly 1
                if (a.matches.length == 1 && b.matches.length != 1) {
                    return 1;
                }
                if (a.matches.length != 1 && b.matches.length == 1) {
                    return -1;
                }
                if (a.matches.length < b.matches.length) {
                    return -1;
                }
                if (a.matches.length > b.matches.length) {
                    return 1;
                }

                return 0;
            });
        });
    });
</script>

<div>
    <h2>Results</h2>
    {#each Object.entries(results) as [file, r]}
        <h3>{file}</h3>
        {#each r as r}
            <div class="result">
                <p
                    class="entry"
                    class:ok={r.matches.length == 1}
                    class:weird={r.matches.length > 1}
                    class:danger={r.matches.length == 0}
                >
                    {r.key}
                    {r.value}
                    {r.matches.length}
                </p>
                {#each r.matches as m}
                    <p class="match">{m.target_file} on row {m.row + 1}</p>
                {/each}
            </div>
        {/each}
    {/each}
</div>

<style>
    .result {
        margin-left: 20px;
    }

    .match {
        margin-left: 20px;
    }

    .entry.ok {
        color: green;
    }
    .entry.weird {
        color: orange;
    }
    .entry.danger {
        color: red;
    }
</style>
