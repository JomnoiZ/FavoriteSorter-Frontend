import {
	rankedMembersListStore,
	uncomparedMembersStore,
	winningTable
} from '../../stores/SortedListStore';
import { type Member } from '$lib/types';

const randomInteger = (minValue: number, maxValue: number) => {
	return minValue + Math.floor(Math.random() * (maxValue - minValue));
};

export const sortByRank = () => {
	rankedMembersListStore.update((currentRankedList) => {
		return currentRankedList.sort((x, y) => {
			return y.Rank - x.Rank;
		});
	});
};

export const onReset = (copiedList: Member[]) => {
	const n = copiedList.length;
	rankedMembersListStore.update(() => {
		const newRankedList = [];
		for (const member of copiedList) {
			newRankedList.push({ Data: member, Rank: 0 });
		}
		return newRankedList;
	});
	uncomparedMembersStore.update(() => {
		const newUncomparedList: number[][] = [];
		for (let i = 0; i < n; i++) {
			newUncomparedList.push([]);
			for (let j = 0; j < n; j++) {
				if (i != j) newUncomparedList[i].push(j);
			}
		}
		console.log(newUncomparedList);
		return newUncomparedList;
	});
	winningTable.update(() => {
		const newWinningTable: boolean[][] = [];
		for (let i = 0; i < n; i++) {
			newWinningTable.push([]);
			for (let j = 0; j < n; j++) {
				newWinningTable[i].push(i == j);
			}
		}
		return newWinningTable;
	});
};

export const getProgress = (allPair: number, uncomparedList: number[][]) => {
	const n = uncomparedList.length;
	if (n == 0) return 0;
	let uncompared = 0;
	for (let i = 0; i < n; i++) uncompared += uncomparedList[i].length;
	if (uncompared == 0) sortByRank();
	return ((allPair - uncompared) / allPair) * 100.0;
};

export const randomPair = (uncomparedList: number[][]) => {
	const tempList = [];
	for (let i = 0; i < uncomparedList.length; i++) {
		if (uncomparedList[i].length > 0) tempList.push(i);
	}

	if (tempList.length == 0) return [-1, -1];

	const index = randomInteger(0, tempList.length - 1);
	const i = tempList[index];
	const j = uncomparedList[i][randomInteger(0, uncomparedList[i].length - 1)];
	console.log(i, j);
	return [i, j];
};

export const onCompare = (x: number, y: number, copiedWinningTable: boolean[][]) => {
	const n = copiedWinningTable.length;
	const cnt: number[] = [];
	for (let i = 0; i < n; i++) cnt.push(0);
	uncomparedMembersStore.update((currentUncompared) => {
		const copiedList = [],
			copiedList2 = [];
		for (const z of currentUncompared[x]) {
			if (copiedWinningTable[y][z] == true) {
				copiedWinningTable[x][z] = true;
				currentUncompared[z] = currentUncompared[z].filter((element) => element != x);
				cnt[x]++;
			} else copiedList.push(z);
		}
		currentUncompared[x] = copiedList;

		for (const z of currentUncompared[y]) {
			if (copiedWinningTable[z][x] == true) {
				copiedWinningTable[z][y] = true;
				currentUncompared[z] = currentUncompared[z].filter((element) => element != y);
				cnt[z]++;
			} else copiedList2.push(z);
		}
		currentUncompared[y] = copiedList2;

		return currentUncompared;
	});
	rankedMembersListStore.update((currentRankedList) => {
		for (let i = 0; i < n; i++) currentRankedList[i].Rank += cnt[i];
		return currentRankedList;
	});
	winningTable.update(() => copiedWinningTable);
};
