import { v4 as uuidv4 } from 'uuid';

interface ITask {
	id: string;
	title: string;
	isCompleted: boolean;
}

// icons
const removeIcon = `<svg width="16px" height="16px"	viewBox="0 0 16 16"	xmlns="http://www.w3.org/2000/svg"><g><polygon points="13.63 3.65 12.35 2.38 8 6.73 3.64 2.38 2.37 3.65 6.72 8.01 2.38 12.35 3.65 13.63 8 9.28 12.35 13.64 13.63 12.36 9.27 8.01 13.63 3.65"/></g></svg>`;
const editIcon = `<svg width="16px" height="16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><g id="Shopicon"><rect x="33.172" y="4.343" transform="matrix(0.7071 -0.7071 0.7071 0.7071 3.473 29.5565)" width="8.485" height="12.485"/><polygon points="27.172,12 4,35.172 4,44 12.829,44 38.829,18 36,20.828"/></g></svg>`;

// new task form
const $submitNewTaskForm = document.getElementById('create-task') as HTMLFormElement | null;
const $submitNewTaskInput = document.getElementById('create-task__input') as HTMLInputElement | null;

// list of tasks
const $taskList = document.getElementById('task-list') as HTMLUListElement | null;

// get existing tasks from localstorage
let tasks: ITask[] = getTasksFromLocalStorage();
tasks.forEach(createTask);

// progress bar and progress counts
const $progressBar = document.getElementById('progressbar__progress') as HTMLDivElement | null;
const $totalTasksNumber = document.getElementById('progressbar__number--total') as HTMLSpanElement | null;
const $completedTasksNumber = document.getElementById('progressbar__number--complited') as HTMLSpanElement | null;

let totalTasksCount: number;
let completedTasksCount: number;

updateProgressBar();

// remove all checked tasks button
const $removeAllCheckedTasksButton = document.getElementById('remove-checked-button') as HTMLButtonElement | null;

// functions to progress bar and progress counts
function updateProgressBar(): void {
	totalTasksCount = tasks.length;
	completedTasksCount = tasks.reduce((count, task) => count + (task.isCompleted ? 1 : 0), 0);

	if ($totalTasksNumber) {
		$totalTasksNumber.innerHTML = totalTasksCount.toString();
	}
	if ($completedTasksNumber) {
		$completedTasksNumber.innerHTML = completedTasksCount.toString();
	}

	const progress = (completedTasksCount / totalTasksCount) * 100;
	if ($progressBar) {
		$progressBar.style.width = `${progress}%`;
	}
}

// functions to update tasks array
function pushNewTaskToArray(newTask: ITask): void {
	tasks.push(newTask);
	updateProgressBar();
}

function removeTaskFromArray(removalTaskId: string): void {
	const tasksWithoutRemovalTarget = tasks.filter(task => task.id !== removalTaskId);
	tasks = tasksWithoutRemovalTarget;
	updateProgressBar();
}

function removeAllCheckedTasksFromArray(): void {
	const uncheckedTasks = tasks.filter(task => task.isCompleted === false);
	tasks = uncheckedTasks;
	updateProgressBar();
}

function setIsTaskCheckedToArray(task: ITask, isCompleted: boolean): void {
	task.isCompleted = isCompleted;
	updateProgressBar();
}

// function to apply styles on checked task
function styleTaskElement(isChecked: boolean, $taskElement: HTMLLIElement) {
	if (isChecked) {
		$taskElement.classList.add('task--checked');
	} else {
		$taskElement.classList.remove('task--checked');
	}
}

function styleTaskInput(isChecked: boolean, $taskInput: HTMLInputElement) {
	if (isChecked) {
		$taskInput.classList.add('task__input--checked');
	} else {
		$taskInput.classList.remove('task__input--checked');
	}
}

// functions to update tasks list
function createTask(task: ITask): void {
	const $task = document.createElement('li');
	$task.classList.add('task');

	const $taskCheckbox = document.createElement('input');
	$taskCheckbox.classList.add('task__checkbox');
	$taskCheckbox.checked = task.isCompleted;
	styleTaskElement($taskCheckbox.checked, $task);
	$taskCheckbox.addEventListener('change', taskCheckboxClickHandler);
	function taskCheckboxClickHandler(): void {
		setIsTaskCheckedToArray(task, $taskCheckbox.checked);
		styleTaskElement($taskCheckbox.checked, $task);
		styleTaskInput($taskCheckbox.checked, $taskInput);
		saveTasksToLocalStorage();
	}
	$taskCheckbox.type = 'checkbox';

	const $taskInput = document.createElement('input');
	$taskInput.classList.add('task__input');
	$taskInput.value = task.title;
	$taskInput.disabled = true;
	styleTaskInput($taskCheckbox.checked, $taskInput);
	$taskInput.addEventListener('blur', taskInputBlurHandler);
	$taskInput.addEventListener('submit', taskInputBlurHandler);
	function taskInputBlurHandler() {
		if ($taskInput.value) {
			$taskInput.disabled = true;
			styleTaskInput($taskCheckbox.checked, $taskInput);
			$editTaskButton.classList.remove('task__edit-button--highlight');
			task.title = $taskInput.value;
			saveTasksToLocalStorage();
		} else {
			$taskInput.focus();
		}
	}

	const $editTaskButton = document.createElement('button');
	$editTaskButton.classList.add('task__edit-button');
	$editTaskButton.innerHTML = editIcon;
	$editTaskButton.addEventListener('click', editTaskButtonClickHandler);
	function editTaskButtonClickHandler(): void {
		$editTaskButton.classList.add('task__edit-button--highlight');
		$taskInput.classList.remove('task__input--checked');
		$taskInput.disabled = false;
		$taskInput.focus();
	}

	const $removeTaskButton = document.createElement('button');
	$removeTaskButton.classList.add('task__remove-button');
	$removeTaskButton.innerHTML = removeIcon;
	$removeTaskButton.addEventListener('click', removeTaskButtonClickHandler);
	function removeTaskButtonClickHandler(): void {
		removeTaskFromArray(task.id);
		saveTasksToLocalStorage();
		$taskCheckbox.removeEventListener('change', taskCheckboxClickHandler);
		$taskInput.removeEventListener('blur', taskInputBlurHandler);
		$taskInput.removeEventListener('submit', taskInputBlurHandler);
		$removeTaskButton.removeEventListener('click', removeTaskButtonClickHandler);
		$task.remove();
	}

	$task.append($taskCheckbox, $taskInput, $editTaskButton, $removeTaskButton);
	$taskList?.append($task);
	saveTasksToLocalStorage();
}

// functions to get/set tasks data from/to localstorage
function getTasksFromLocalStorage(): ITask[] {
	const tasksFromLocalStorage = localStorage.getItem('TASKS');
	if (tasksFromLocalStorage) {
		return JSON.parse(tasksFromLocalStorage);
	}
	return [];
}

function saveTasksToLocalStorage(): void {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}

// submit new task event listener
$submitNewTaskForm?.addEventListener('submit', e => {
	e.preventDefault();

	if ($submitNewTaskInput?.value) {
		const newTask: ITask = {
			id: uuidv4(),
			title: $submitNewTaskInput?.value,
			isCompleted: false
		};
		pushNewTaskToArray(newTask);

		createTask(newTask);
		$submitNewTaskInput.value = '';
	}
});

// remove all checked tasks
$removeAllCheckedTasksButton?.addEventListener('click', () => {
	if (tasks) {
		removeAllCheckedTasksFromArray();
		saveTasksToLocalStorage();

		const tasksCollection = $taskList?.children;
		if (tasksCollection) {
			for (let i = 0; i < tasksCollection.length; i++) {
				const $task = tasksCollection[i];
				const $checkbox = $task.children[0] as HTMLInputElement;
				const isChecked = $checkbox.checked;

				if (isChecked) {
					$task.remove();
					i--;
				}
			}
		}
	}
});
