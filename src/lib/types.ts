export interface LList {
	list: number[];
}

export interface List {
	id: string;
	title: string;
}

export interface Member {
	name: string;
	image: string;
}

export interface RankedMember {
	data: Member;
	rank: number;
}
