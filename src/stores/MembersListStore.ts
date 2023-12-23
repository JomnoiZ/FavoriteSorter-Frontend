import { type Member } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const membersListStore: Writable<Member[]> = writable([]);
