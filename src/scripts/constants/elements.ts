import { ids } from './ids';

// new task form
const $submitNewTaskForm = document.getElementById(ids.createTaskIds.submitNewTaskForm) as HTMLFormElement | null;
const $submitNewTaskInput = document.getElementById(ids.createTaskIds.submitNewTaskInput) as HTMLInputElement | null;
// list of tasks
const $taskList = document.getElementById(ids.taskListId) as HTMLUListElement | null;
// progress bar and progress counts
const $progressBar = document.getElementById(ids.progressBarIds.progressBar) as HTMLDivElement | null;
const $totalTasksNumber = document.getElementById(ids.progressBarIds.totalTasksNumber) as HTMLSpanElement | null;
const $completedTasksNumber = document.getElementById(
	ids.progressBarIds.completedTasksNumber
) as HTMLSpanElement | null;
// remove all checked tasks button
const $removeAllCheckedTasksButton = document.getElementById(
	ids.removeAllCheckedTasksButtonId
) as HTMLButtonElement | null;

export const elements = {
	$submitNewTaskForm: $submitNewTaskForm,
	$submitNewTaskInput: $submitNewTaskInput,
	$taskList: $taskList,
	$progressBar: $progressBar,
	$totalTasksNumber: $totalTasksNumber,
	$completedTasksNumber: $completedTasksNumber,
	$removeAllCheckedTasksButton: $removeAllCheckedTasksButton
};
