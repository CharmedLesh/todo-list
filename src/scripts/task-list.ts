import { LocalStorage } from './local-storage';
import { Task } from './task';

type ID = string;

export class TaskList {
	localStorage = new LocalStorage<Task[]>({ key: 'TASKS' });
	tasks: Task[];

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

	check(taskOrId: ID | Task): void {
		if (taskOrId instanceof Task) {
			taskOrId.check();
		} else {
			const taskIndex = this.tasks.findIndex(task => task.id === taskOrId);
			this.tasks[taskIndex].check();
		}
		this.save();
		// Progress.updateProgressBar();
	}

	edit(taskOrId: ID | Task, newTitle: string): void {
		if (taskOrId instanceof Task) {
			taskOrId.editTitle(newTitle);
		} else {
			const taskIndex = this.tasks.findIndex(task => task.id === taskOrId);
			this.tasks[taskIndex].editTitle(newTitle);
		}
		this.save();
		// Progress.updateProgressBar();
	}

	remove(taskOrId: ID | Task): void {
		const id = taskOrId instanceof Task ? taskOrId.getId() : taskOrId;
		this.tasks = this.tasks.filter(task => task.id !== id);
		this.save();
		// Progress.updateProgressBar();
	}

	removeAllChecked(): void {
		this.tasks = this.tasks.filter(task => task.isChecked === false);
		this.save();
		// Progress.updateProgressBar();
	}
}
