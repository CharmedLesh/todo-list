import { ITask } from '../interfaces/interfaces';

// functions to get/set tasks data from/to localstorage
export function getTasksFromLocalStorage(): ITask[] {
	const tasksFromLocalStorage = localStorage.getItem('TASKS');
	if (tasksFromLocalStorage) {
		return JSON.parse(tasksFromLocalStorage);
	}
	return [];
}

export function saveTasksToLocalStorage(tasks: ITask[]): void {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}
