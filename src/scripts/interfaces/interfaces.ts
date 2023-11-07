export interface ITask {
	id?: string;
	title: string;
	isChecked: boolean;
}

export interface IElements {
	$taskList: HTMLUListElement | null;
	$createTaskForm: HTMLFormElement | null;
	$createTaskInput: HTMLInputElement | null;
	$progressBarProgress: HTMLDivElement | null;
	$progressBarCompletedTasksNumber: HTMLSpanElement | null;
	$progressBarTotalTasksNumber: HTMLSpanElement | null;
	$removeAllCheckedTasksButton: HTMLButtonElement | null;
}
