import { writable } from "svelte/store"

export const ref_files = writable([]);

export const cmp_files = writable([]);

export const selections = writable({});

export const file_contents = writable({});

export const cmp_file_contents = writable({});

// for testing
// export const selections = writable({
//     "source.xlsx": [false, false, true]
// });

// export const file_contents = writable({
//     "source.xlsx": [["First Name", "Last Name", "Email"], ["Kellan", "Cooper", "k.cooper@randatmail.com"], ["Isabella", "Morris", "i.morris@randatmail.com"], ["Adrian", "Baker", "a.baker@randatmail.com"], ["Tara", "Clark", "t.clark@randatmail.com"], ["Darcy", "Stewart", "d.stewart@randatmail.com"], ["Miller", "Cunningham", "m.cunningham@randatmail.com"], ["Walter", "Murphy", "w.murphy@randatmail.com"], ["John", "Watson", "j.watson@randatmail.com"], ["Alberta", "Hamilton", "a.hamilton@randatmail.com"], ["Aldus", "Murphy", "a.murphy@randatmail.com"], ["Amy", "Hunt", "a.hunt@randatmail.com"], ["Rafael", "Fowler", "r.fowler@randatmail.com"], ["Jessica", "Hamilton", "j.hamilton@randatmail.com"], ["Melanie", "Clark", "m.clark@randatmail.com"], ["Evelyn", "Foster", "e.foster@randatmail.com"], ["Dainton", "Smith", "d.smith@randatmail.com"], ["Lucia", "Hawkins", "l.hawkins@randatmail.com"], ["Stuart", "Ferguson", "s.ferguson@randatmail.com"], ["Haris", "Carter", "h.carter@randatmail.com"], ["David", "Carroll", "d.carroll@randatmail.com"]]
// });

// export const cmp_file_contents = writable({
//     "target.xlsx":[["Email","Phone"],["k.cooper@randatmail.com","093-6623-47"],["i.morris@randatmail.com","387-7819-99"],["a.baker@randatmail.com","852-2045-31"],["t.clark@randatmail.com","693-7815-54"],["d.stewart@randatmail.com","618-4134-59"],["w.murphy@randatmail.com","726-7319-29"],["j.watson@randatmail.com","808-6188-50"],["foo.bar@gmail.com","123-456-789"],["a.hamilton@randatmail.com","628-8854-20"],["a.murphy@randatmail.com","156-2390-47"],["r.fowler@randatmail.com","809-0951-32"],["j.hamilton@randatmail.com","990-7741-50"],["e.foster@randatmail.com","598-0966-20"],["d.smith@randatmail.com","903-2089-10"],["l.hawkins@randatmail.com","273-1915-61"],["s.ferguson@randatmail.com","399-7904-32"],["h.carter@randatmail.com","308-5667-51"],["d.carroll@randatmail.com","519-1381-49"]],
//     "foo.xlsx": [["Business", "Type"], ["k.cooper@randatmail.com", "A"], ["m.cunningham@randatmail.com", "B"], ["invalid", "C"]]
// });

