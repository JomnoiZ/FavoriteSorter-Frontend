import {
	rankedMembersListStore,
	uncomparedMembersStore,
	winningTable
} from '../../stores/SortedListStore';
import { type LList, type Member } from '$lib/types';
import { updateList } from './dataServices';
import { get } from 'svelte/store';

const randomInteger = (minValue: number, maxValue: number) => {
	return minValue + Math.floor(Math.random() * (maxValue - minValue));
};

const sortByRank = async (id: string) => {
	rankedMembersListStore.update((currentRankedList) => {
		return currentRankedList.sort((x, y) => {
			return y.rank - x.rank;
		});
	});
	updateList(id, { rankedList: get(rankedMembersListStore) });
};

export const onReset = (copiedList: Member[], id: string) => {
	const n = copiedList.length;
	rankedMembersListStore.update(() => {
		const newRankedList = [];
		for (const member of copiedList) {
			newRankedList.push({ data: member, rank: 0 });
		}
		return newRankedList;
	});
	uncomparedMembersStore.update(() => {
		const newUncomparedList: LList[] = [];
		for (let i = 0; i < n; i++) {
			newUncomparedList.push({ list: [] });
			for (let j = 0; j < n; j++) {
				if (i !== j) newUncomparedList[i].list.push(j);
			}
		}
		console.log(newUncomparedList);
		return newUncomparedList;
	});
	winningTable.update(() => {
		const newWinningTable: LList[] = [];
		for (let i = 0; i < n; i++) {
			newWinningTable.push({ list: [] });
			for (let j = 0; j < n; j++) {
				newWinningTable[i].list.push(Number(i === j));
			}
		}
		return newWinningTable;
	});
	updateList(id, {
		rankedList: get(rankedMembersListStore),
		uncomparedMembers: get(uncomparedMembersStore),
		winningTable: get(winningTable)
	});
};

export const getProgress = (allPair: number, uncomparedList: LList[], id: string) => {
	const n = uncomparedList.length;
	if (n === 0) return 0;
	let uncompared = 0;
	for (let i = 0; i < n; i++) {
		console.log(uncomparedList[i].list.length);
		uncompared += uncomparedList[i].list.length;
	}
	if (uncompared === 0) sortByRank(id);

	console.log(n, allPair, uncompared, uncomparedList);
	return ((allPair - uncompared) / allPair) * 100.0;
};

export const randomPair = (uncomparedList: LList[]) => {
	const tempList = [];
	for (let i = 0; i < uncomparedList.length; i++) {
		if (uncomparedList[i].list.length > 0) tempList.push(i);
	}

	if (tempList.length === 0) return [-1, -1];

	const index = randomInteger(0, tempList.length - 1);
	const i = tempList[index];
	const j = uncomparedList[i].list[randomInteger(0, uncomparedList[i].list.length - 1)];
	console.log(i, j);
	return [i, j];
};

export const onCompare = (x: number, y: number, copiedWinningTable: LList[], id: string) => {
	const n = copiedWinningTable.length;
	const cnt: number[] = [];
	for (let i = 0; i < n; i++) cnt.push(0);
	uncomparedMembersStore.update((currentUncompared) => {
		const copiedList = [],
			copiedList2 = [];
		for (const z of currentUncompared[x].list) {
			if (copiedWinningTable[y].list[z] === 1) {
				copiedWinningTable[x].list[z] = 1;
				currentUncompared[z].list = currentUncompared[z].list.filter((element) => element !== x);
				cnt[x]++;
			} else copiedList.push(z);
		}
		currentUncompared[x].list = copiedList;

		for (const z of currentUncompared[y].list) {
			if (copiedWinningTable[z].list[x] === 1) {
				copiedWinningTable[z].list[y] = 1;
				currentUncompared[z].list = currentUncompared[z].list.filter((element) => element !== y);
				cnt[z]++;
			} else copiedList2.push(z);
		}
		currentUncompared[y].list = copiedList2;

		return currentUncompared;
	});
	rankedMembersListStore.update((currentRankedList) => {
		for (let i = 0; i < n; i++) currentRankedList[i].rank += cnt[i];
		return currentRankedList;
	});
	winningTable.update(() => copiedWinningTable);

	updateList(id, {
		rankedList: get(rankedMembersListStore),
		uncomparedMembers: get(uncomparedMembersStore),
		winningTable: get(winningTable)
	});
};
