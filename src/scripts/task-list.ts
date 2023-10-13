import { ITask } from './interfaces';
import { LocalStorage } from './local-storage';
import { Task } from './task';

type ID = string;

export class TaskList {
	localStorage = new LocalStorage<ITask[]>({ key: 'TASKS' });
	tasks: ITask[];

	constructor() {
		this.tasks = this.localStorage.get() || [];
	}

	save(): void {
		this.localStorage.set(this.tasks);
	}

	push(task: Task): void {
		this.tasks.push(task);
		this.save();
		// Progress.updateProgressBar();
	}

	remove(taskOrId: ID | Task): void {
		const id = taskOrId instanceof Task ? taskOrId.getId() : taskOrId;
		this.tasks = this.tasks.filter(task => task.id !== id);
		this.save();
		// Progress.updateProgressBar();
	}
}
