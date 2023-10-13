import { v4 as uuidv4 } from 'uuid';
import { ITask } from './interfaces';

type ID = string;

export class Task {
	id: ID;
	title: string;
	isChecked: boolean;

	constructor({ title, isChecked }: ITask) {
		this.id = uuidv4();
		this.title = title;
		this.isChecked = isChecked;
	}

	getId(): ID {
		return this.id;
	}
}
