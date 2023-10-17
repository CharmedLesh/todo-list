import { v4 as uuidv4 } from 'uuid';

type ID = string;

export class Task {
	id: ID;
	title: string;
	isChecked: boolean;

	constructor({ title, isChecked }: { title: string; isChecked: boolean }) {
		this.id = uuidv4();
		this.title = title;
		this.isChecked = isChecked;
	}

	getId(): ID {
		return this.id;
	}

	check(): void {
		this.isChecked = !this.isChecked;
	}

	editTitle(newTitle: string): void {
		this.title = newTitle;
	}
}
