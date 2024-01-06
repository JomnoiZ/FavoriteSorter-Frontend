import { goto } from '$app/navigation';
import { PUBLIC_API_BASE } from '$env/static/public';
import { type Member, type List } from '$lib/types';
import { read, utils } from 'xlsx';
import { selectedListStore, membersListStore } from '../../stores/MembersListStore';
import {
	rankedMembersListStore,
	uncomparedMembersStore,
	winningTable
} from '../../stores/SortedListStore';
import { listsStore, userStore } from '../../stores/UserStore';

export async function initData() {
	if (!userStore) return;

	const lists = await fetch(PUBLIC_API_BASE + '/members-list', {
		headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
	})
		.then((res) => {
			if (res.status === 401) {
				onLogout();
				throw new Error('Please Login!');
			}
			return res.json();
		})
		.catch((err) => console.log(err));
	const newLists: List[] = [];
	for (const list of lists) newLists.push({ id: list.id, title: list.title });
	listsStore.update(() => newLists);
}

export async function updateListStore(result) {
	if (Object.keys(result).includes('id') && Object.keys(result).includes('title'))
		selectedListStore.update(() => {
			return { id: result.id, title: result.title };
		});
	if (Object.keys(result).includes('list')) membersListStore.update(() => result.list);
	if (Object.keys(result).includes('rankedList'))
		rankedMembersListStore.update(() => result.rankedList);
	if (Object.keys(result).includes('uncomparedMembers'))
		uncomparedMembersStore.update(() => result.uncomparedMembers);
	if (Object.keys(result).includes('winningTable')) winningTable.update(() => result.winningTable);
}

export async function onSelectList(id: string, cur_id: string) {
	if (id === cur_id) {
		updateListStore({
			id: 'n/a',
			title: 'untitiled',
			list: [],
			rankedList: [],
			uncomparedMambers: [],
			winningTable: []
		});
		return;
	}

	const result = await fetch(PUBLIC_API_BASE + '/members-list/' + id, {
		headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
	})
		.then((res) => {
			if (res.status === 401) {
				onLogout();
				throw new Error('Please Login!');
			}
			return res.json();
		})
		.catch((err) => console.log(err));

	console.log(result);
	updateListStore(result);
}

export async function editTitle(id: string, newTitle: string) {
	updateListStore({ id, title: newTitle });
	await updateList(id, { title: newTitle });
}

export async function onDrop(files: File[]) {
	const file = await files[0].arrayBuffer();
	const fileName = files[0].name.split('.')[0];

	const workbook = read(file);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
	const data = utils.sheet_to_json(worksheet);

	const copiedList: Member[] = [];
	for (const row of data) {
		copiedList.push({ name: row['ชื่อ'], image: row['รูป'] });
	}

	await fetch(PUBLIC_API_BASE + '/members-list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token')
		},
		body: JSON.stringify({
			title: fileName,
			list: copiedList
		})
	})
		.then((res) => {
			if (res.status === 401) {
				onLogout();
				throw new Error('Please Login!');
			}
			return res.json();
		})
		.then((data) => {
			selectedListStore.update(() => {
				return { id: data.id, title: data.title };
			});
			console.log(data);
		})
		.catch((err) => console.log(err));

	membersListStore.update(() => copiedList);
	goto('/all-members');
}

export async function updateList(id: string, newList) {
	const result = await fetch(PUBLIC_API_BASE + '/members-list/' + id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('token')
		},
		body: JSON.stringify(newList)
	})
		.then((res) => {
			if (res.status === 401) {
				onLogout();
				throw new Error('Please Login!');
			}
			return res.json();
		})
		.catch((err) => console.log(err));

	console.log(result);
}

export async function deleteList(id: string) {
	if (!confirm('Are you sure to delete the list?')) return;

	const result = await fetch(PUBLIC_API_BASE + '/members-list/' + id, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('token')
		}
	})
		.then((res) => {
			if (res.status === 401) {
				onLogout();
				throw new Error('Please Login!');
			}
			return res.json();
		})
		.catch((err) => console.log(err));

	console.log(result);
	selectedListStore.update(() => {
		return { id: 'n/a', title: 'untitled' };
	});
	listsStore.update((cur) => cur.filter((list) => list.id !== id));
	updateListStore({
		id: 'n/a',
		title: 'untitiled',
		list: [],
		rankedList: [],
		uncomparedMembers: [],
		winningTable: []
	});
}

export async function onRegister(username: string, password: string, password2: string) {
	console.log(username, password, password2);
	if (password !== password2) {
		alert("Passwords don't match");
		return;
	}

	const result = await fetch(PUBLIC_API_BASE + '/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: username,
			password: password
		})
	}).then((res) => res.json());
	console.log(result);
}

export async function onLogin(username: string, password: string) {
	console.log(username, password);
	await fetch(PUBLIC_API_BASE + '/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: username,
			password: password
		})
	})
		.then((res) => {
			if (res.status === 401) throw new Error("Username or password don't match");
			return res.json();
		})
		.then((data) => {
			console.log(data);

			userStore.update(() => username);
			localStorage.setItem('token', data.access_token);
			localStorage.setItem('username', username);
		})
		.catch((err) => {
			alert('Login Failed!');
			console.log(err);
		});
	goto('/my-profile');
}

export function onLogout() {
	if (!confirm('Are you sure to logout?')) return;

	userStore.update(() => '');
	localStorage.removeItem('username');
	localStorage.removeItem('token');
	goto('/');
}
