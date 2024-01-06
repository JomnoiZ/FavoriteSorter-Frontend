import { type List, type Member } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const selectedListStore: Writable<List> = writable({ id: 'n/a', title: 'untitled' });
export const membersListStore: Writable<Member[]> = writable([]);
