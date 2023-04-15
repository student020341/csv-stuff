import {writable} from "svelte/store"

export const ref_files = writable([]);

export const cmp_files = writable([]);

export const selections = writable({});

export const file_contents = writable({});

export const cmp_file_contents = writable({});
