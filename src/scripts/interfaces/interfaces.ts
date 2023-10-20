export interface ITask {
	id?: string;
	title: string;
	isChecked: boolean;
}

export interface IElementsIds {
	todoListId: string;
	createTaskFormId: string;
	createTaskInputId: string;
	taskListId: string;
	progressBarProgressId: string;
	progressBarCompletedTasksNumberId: string;
	progressBarTotalTasksNumberId: string;
	removeCheckedButtonId: string;
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
