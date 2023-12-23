import { type RankedMember } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const rankedMembersListStore: Writable<RankedMember[]> = writable([]);
export const uncomparedMembersStore: Writable<number[][]> = writable([]);
export const winningTable: Writable<boolean[][]> = writable([]);
