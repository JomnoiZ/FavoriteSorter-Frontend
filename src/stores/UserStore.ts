import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import { type List } from '$lib/types';

export const userStore: Writable<string> = writable(
	(browser && localStorage.getItem('username')) || ''
);
export const listsStore: Writable<List[]> = writable([]);

userStore.subscribe((val) => browser && localStorage.setItem('username', val));
