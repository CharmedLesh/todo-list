import { TaskList } from './task-list';
import { createTaskIds } from '../constants/ids';
import { taskListId } from '../constants/ids';
import { progressBarIds } from '../constants/ids';
import { removeAllCheckedTasksButtonId } from '../constants/ids';
import { Render } from './render';
import { Task } from './task';

const $submitNewTaskForm = document.getElementById(createTaskIds.submitNewTaskForm) as HTMLFormElement | null;
const $submitNewTaskInput = document.getElementById(createTaskIds.submitNewTaskInput) as HTMLInputElement | null;
const $taskList = document.getElementById(taskListId) as HTMLUListElement | null;
const $progressBar = document.getElementById(progressBarIds.progressBar) as HTMLDivElement | null;
const $totalTasksNumber = document.getElementById(progressBarIds.totalTasksNumber) as HTMLSpanElement | null;
const $completedTasksNumber = document.getElementById(progressBarIds.completedTasksNumber) as HTMLSpanElement | null;
const $removeAllCheckedTasksButton = document.getElementById(removeAllCheckedTasksButtonId) as HTMLButtonElement | null;

const taskList = new TaskList();
Render.renderTaskList(taskList.tasks, $taskList);

// new task submit event listener
$submitNewTaskForm?.addEventListener('submit', e => {
	e.preventDefault();

	if ($submitNewTaskInput?.value) {
		const newTask: Task = new Task({ title: $submitNewTaskInput.value, isChecked: false });
		taskList.push(newTask);
		Render.renderTask(newTask, $taskList);
		$submitNewTaskInput.value = '';
	}
});
