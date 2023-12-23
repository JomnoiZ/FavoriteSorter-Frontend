import { membersListStore } from '../../stores/MembersListStore';
import { read, utils } from 'xlsx';
import { type Member } from '$lib/types';
import { onReset } from './rankedListServices';

export async function onDrop(files: File[]) {
	const file = await files[0].arrayBuffer();
	const workbook = read(file);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
	const data = utils.sheet_to_json(worksheet);

	membersListStore.update((currentList: Member[]) => {
		const copiedList = currentList;
		copiedList.splice(0, copiedList.length);
		for (const row of data) {
			copiedList.push({ Name: row['ชื่อ'], Image: row['รูป'] });
		}
		onReset(copiedList);
		return copiedList;
	});
}
