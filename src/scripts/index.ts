import { createTask } from './functions/create-task';
import { getTasksFromLocalStorage } from './functions/tasks-local-storage';
import { updateProgressBar } from './functions/update-progress-bar';
import { ITask } from './interfaces/interfaces';
import { applyRemoveAllCheckedEventListener } from './functions/apply-remove-all-checked-event-listener';
import { applySubmitNewEventListener } from './functions/apply-submit-new-event-listener';

// state to check if user is editing task
let isEditing: boolean = false;
// get existing tasks from localstorage
let tasks: ITask[] = getTasksFromLocalStorage();
tasks.forEach(task => {
	createTask(tasks, task, isEditing, setIsTaskCheckedToArray, removeTaskFromArray);
});

updateProgressBar(tasks);

// functions to update tasks array
function pushNewTaskToArray(newTask: ITask): void {
	tasks.push(newTask);
	updateProgressBar(tasks);
}

function removeTaskFromArray(removalTaskId: string): void {
	const tasksWithoutRemovalTarget = tasks.filter(task => task.id !== removalTaskId);
	tasks = tasksWithoutRemovalTarget;
	updateProgressBar(tasks);
}

function removeAllCheckedTasksFromArray(): void {
	const uncheckedTasks = tasks.filter(task => task.isCompleted === false);
	tasks = uncheckedTasks;
	updateProgressBar(tasks);
}

function setIsTaskCheckedToArray(task: ITask, isCompleted: boolean): void {
	task.isCompleted = isCompleted;
	updateProgressBar(tasks);
}

applySubmitNewEventListener(tasks, pushNewTaskToArray, isEditing, setIsTaskCheckedToArray, removeTaskFromArray);
applyRemoveAllCheckedEventListener(tasks, removeAllCheckedTasksFromArray);
