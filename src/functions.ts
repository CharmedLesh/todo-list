import { v4 as uuidv4 } from 'uuid';

interface ITask {
	id: string;
	title: string;
	isCompleted: boolean;
}

// constants for classes
const taskLiClass: string = 'task';
const taskLiCheckedClass: string = `${taskLiClass}--checked`;
const taskCheckboxClass: string = `${taskLiClass}__checkbox`;
const taskInputClass: string = `${taskLiClass}__input`;
const taskInputCheckedClass: string = `${taskInputClass}--checked`;
const taskEditButtonClass: string = `${taskLiClass}__button`;
const taskEditButtonHighlightedClass: string = `${taskEditButtonClass}--highlight`;
const taskRemoveButtonClass: string = `${taskLiClass}__button`;

// constants for ids
const createTaskIds = {
	submitNewTaskForm: 'create-task',
	submitNewTaskInput: 'create-task__input'
};
const taskListId: string = 'task-list';
const progressBarIds = {
	progressBar: 'progressbar__progress',
	totalTasksNumber: 'progressbar__number--total',
	completedTasksNumber: 'progressbar__number--complited'
};
const removeAllCheckedTasksButtonId: string = 'remove-checked-button';

// state to check if user is editing task
let isEditing: boolean = false;

// icons
const removeIcon = `<svg width="16px" height="16px"	viewBox="0 0 16 16"	xmlns="http://www.w3.org/2000/svg"><g><polygon points="13.63 3.65 12.35 2.38 8 6.73 3.64 2.38 2.37 3.65 6.72 8.01 2.38 12.35 3.65 13.63 8 9.28 12.35 13.64 13.63 12.36 9.27 8.01 13.63 3.65"/></g></svg>`;
const editIcon = `<svg width="16px" height="16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><g id="Shopicon"><rect x="33.172" y="4.343" transform="matrix(0.7071 -0.7071 0.7071 0.7071 3.473 29.5565)" width="8.485" height="12.485"/><polygon points="27.172,12 4,35.172 4,44 12.829,44 38.829,18 36,20.828"/></g></svg>`;

// new task form
const $submitNewTaskForm = document.getElementById(createTaskIds.submitNewTaskForm) as HTMLFormElement | null;
const $submitNewTaskInput = document.getElementById(createTaskIds.submitNewTaskInput) as HTMLInputElement | null;

// list of tasks
const $taskList = document.getElementById(taskListId) as HTMLUListElement | null;

// get existing tasks from localstorage
let tasks: ITask[] = getTasksFromLocalStorage();
tasks.forEach(createTask);

// progress bar and progress counts
const $progressBar = document.getElementById(progressBarIds.progressBar) as HTMLDivElement | null;
const $totalTasksNumber = document.getElementById(progressBarIds.totalTasksNumber) as HTMLSpanElement | null;
const $completedTasksNumber = document.getElementById(progressBarIds.completedTasksNumber) as HTMLSpanElement | null;

let totalTasksCount: number;
let completedTasksCount: number;

updateProgressBar();

// remove all checked tasks button
const $removeAllCheckedTasksButton = document.getElementById(removeAllCheckedTasksButtonId) as HTMLButtonElement | null;

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

// function to apply styles on task
function styleTaskElement(isChecked: boolean, $taskElement: HTMLLIElement) {
	if (isChecked) {
		$taskElement.classList.add(taskLiCheckedClass);
	} else {
		$taskElement.classList.remove(taskLiCheckedClass);
	}
}

function styleTaskInput(isChecked: boolean, $taskInput: HTMLInputElement) {
	if (isChecked) {
		$taskInput.classList.add(taskInputCheckedClass);
	} else {
		$taskInput.classList.remove(taskInputCheckedClass);
	}
}

// functions to update tasks list
function createTask(task: ITask): void {
	const $task = document.createElement('li');
	$task.classList.add(taskLiClass);

	const $taskCheckbox = document.createElement('input');
	$taskCheckbox.classList.add(taskCheckboxClass);
	$taskCheckbox.type = 'checkbox';
	$taskCheckbox.checked = task.isCompleted;
	styleTaskElement($taskCheckbox.checked, $task);
	$taskCheckbox.addEventListener('change', taskCheckboxClickHandler);
	function taskCheckboxClickHandler(): void {
		setIsTaskCheckedToArray(task, $taskCheckbox.checked);
		styleTaskElement($taskCheckbox.checked, $task);
		styleTaskInput($taskCheckbox.checked, $taskInput);
		saveTasksToLocalStorage();
	}

	const $taskInput = document.createElement('input');
	$taskInput.classList.add(taskInputClass);
	$taskInput.value = task.title;
	$taskInput.disabled = true;
	$taskInput.spellcheck = false;
	styleTaskInput($taskCheckbox.checked, $taskInput);
	$taskInput.addEventListener('blur', () => $taskInput.focus());
	$taskInput.addEventListener('keyup', EscOrEnterKeyUpHandler);
	function EscOrEnterKeyUpHandler(e: KeyboardEvent) {
		if (e.code === 'Escape' || e.code === 'Enter') {
			editTaskButtonClickHandler();
		}
	}

	const $editTaskButton = document.createElement('button');
	$editTaskButton.classList.add(taskEditButtonClass);
	$editTaskButton.innerHTML = editIcon;
	$editTaskButton.addEventListener('click', editTaskButtonClickHandler);
	function editTaskButtonClickHandler(): void {
		if (!isEditing) {
			const allButtons = document.querySelectorAll('button');
			for (let i = 0; i < allButtons.length; i++) {
				if (allButtons[i] !== $editTaskButton) {
					allButtons[i].disabled = true;
				}
			}
			$editTaskButton.classList.add(taskEditButtonHighlightedClass);
			$taskInput.classList.remove(taskInputCheckedClass);
			$taskInput.disabled = false;
			$taskInput.focus();
			isEditing = true;
		} else {
			if ($taskInput.value) {
				const allButtons = document.querySelectorAll('button');
				for (let i = 0; i < allButtons.length; i++) {
					allButtons[i].disabled = false;
				}
				$taskInput.disabled = true;
				styleTaskInput($taskCheckbox.checked, $taskInput);
				$editTaskButton.classList.remove(taskEditButtonHighlightedClass);
				task.title = $taskInput.value;
				saveTasksToLocalStorage();
				isEditing = false;
			} else {
				$taskInput.focus();
			}
		}
	}

	const $removeTaskButton = document.createElement('button');
	$removeTaskButton.classList.add(taskRemoveButtonClass);
	$removeTaskButton.innerHTML = removeIcon;
	$removeTaskButton.addEventListener('click', removeTaskButtonClickHandler);
	function removeTaskButtonClickHandler(): void {
		removeTaskFromArray(task.id);
		saveTasksToLocalStorage();
		$taskCheckbox.removeEventListener('change', taskCheckboxClickHandler);
		$taskInput.removeEventListener('blur', () => $taskInput.focus());
		$taskInput.removeEventListener('keyup', EscOrEnterKeyUpHandler);
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
