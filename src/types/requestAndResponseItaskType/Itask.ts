export interface Itask {
	id: number;
	nextTaskId: number;
	name: string;
	image: string;
	file?: any;
	level: ItaskLevel;
	type: ItaskType;
	answers: ItaskAnswers[];
	ars?: any;
	strAnswers?: any;
	description: string;
	imageStr?: string;
}
export interface ItaskLevel {
	id: number | string;
	name: string | null;
}
export interface ItaskType {
	id: number | string;
	name: string | null;
}
export interface ItaskAnswers {
	id: number;
	name?: any;
	text: string;
	value?: any;
	rowTextNum: number;
	right: boolean;
}