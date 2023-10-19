import { v4 as uuidv4 } from 'uuid';

interface ITask {
	id: string;
	title: string;
	isChecked: boolean;
}

// icons
const removeIcon = `<svg width="16px" height="16px"	viewBox="0 0 16 16"	xmlns="http://www.w3.org/2000/svg"><g><polygon points="13.63 3.65 12.35 2.38 8 6.73 3.64 2.38 2.37 3.65 6.72 8.01 2.38 12.35 3.65 13.63 8 9.28 12.35 13.64 13.63 12.36 9.27 8.01 13.63 3.65"/></g></svg>`;
const editIcon = `<svg width="16px" height="16px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><g id="Shopicon"><rect x="33.172" y="4.343" transform="matrix(0.7071 -0.7071 0.7071 0.7071 3.473 29.5565)" width="8.485" height="12.485"/><polygon points="27.172,12 4,35.172 4,44 12.829,44 38.829,18 36,20.828"/></g></svg>`;

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

// constants for classes
const taskLiClass: string = 'task';
const taskLiCheckedClass: string = `${taskLiClass}--checked`;
const taskCheckboxClass: string = `${taskLiClass}__checkbox`;
const taskInputClass: string = `${taskLiClass}__input`;
const taskInputCheckedClass: string = `${taskInputClass}--checked`;
const taskButtonClass: string = `${taskLiClass}__button`;
const taskButtonHighlightClass: string = `${taskButtonClass}--highlight`;
const taskEditButtonClass: string = `${taskButtonClass}--edit-button`;
const taskRemoveButtonClass: string = `${taskButtonClass}--remove-button`;

// elements
const $submitNewTaskForm = document.getElementById(createTaskIds.submitNewTaskForm) as HTMLFormElement | null;
const $submitNewTaskInput = document.getElementById(createTaskIds.submitNewTaskInput) as HTMLInputElement | null;
const $taskList = document.getElementById(taskListId) as HTMLUListElement | null;
const $progressBar = document.getElementById(progressBarIds.progressBar) as HTMLDivElement | null;
const $totalTasksNumber = document.getElementById(progressBarIds.totalTasksNumber) as HTMLSpanElement | null;
const $completedTasksNumber = document.getElementById(progressBarIds.completedTasksNumber) as HTMLSpanElement | null;
const $removeAllCheckedTasksButton = document.getElementById(removeAllCheckedTasksButtonId) as HTMLButtonElement | null;

// methods to get/set tasks data from/to localstorage
class LocalStorage {
	static saveTasksToStorage(): void {
		localStorage.setItem('TASKS', JSON.stringify(tasks));
	}

	static getTasksFromStorage(): ITask[] {
		const tasksFromLocalStorage = localStorage.getItem('TASKS');
		return tasksFromLocalStorage ? JSON.parse(tasksFromLocalStorage) : [];
	}
}

// variables and states
let isEditing: boolean = false;
let tasks: ITask[] = LocalStorage.getTasksFromStorage();
let totalTasksCount: number = 0;
let completedTasksCount: number = 0;

// task entity
class Task {
	id: string;
	title: string;
	isChecked: boolean;

	constructor(title: string, isChecked: boolean) {
		this.id = uuidv4();
		this.title = title;
		this.isChecked = isChecked;
	}
}

class Tasks {
	static pushNewTask(value: string): void {
		const newTask = new Task(value, false);
		tasks.push(newTask);
		LocalStorage.saveTasksToStorage();
		Progress.updateProgressBar();
	}

	static setIsTaskCompletedById(id: string, isChecked: boolean): void {
		const taskIndex = tasks.findIndex(task => task.id === id);
		tasks[taskIndex].isChecked = isChecked;
		LocalStorage.saveTasksToStorage();
		Progress.updateProgressBar();
	}

	static editTaskTitleById(id: string, title: string): void {
		const taskIndex = tasks.findIndex(task => task.id === id);
		tasks[taskIndex].title = title;
		LocalStorage.saveTasksToStorage();
	}

	static removeTaskById(id: string): void {
		tasks = tasks.filter(task => task.id !== id);
		LocalStorage.saveTasksToStorage();
		Progress.updateProgressBar();
	}

	static removeAllCheckedTasks(): void {
		const uncheckedTasks = tasks.filter(task => task.isChecked === false);
		tasks = uncheckedTasks;
		LocalStorage.saveTasksToStorage();
		Progress.updateProgressBar();
	}
}

// progress
class Progress {
	static updateProgressBar(): void {
		totalTasksCount = tasks.length;
		completedTasksCount = tasks.reduce((count, task) => count + (task.isChecked ? 1 : 0), 0);

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
}

// display tasks in DOM
class Render {
	static renderNewTask(task: ITask): void {
		const $task = document.createElement('li');
		$task.classList.add(taskLiClass);
		$task.setAttribute('data-id', task.id);

		const $taskCheckbox = document.createElement('input');
		$taskCheckbox.classList.add(taskCheckboxClass);
		$taskCheckbox.type = 'checkbox';
		$taskCheckbox.checked = task.isChecked;
		ConditionalClasses.styleTaskLiElement(task.isChecked, $task);

		const $taskInput = document.createElement('input');
		$taskInput.classList.add(taskInputClass);
		$taskInput.value = task.title;
		$taskInput.disabled = true;
		$taskInput.spellcheck = false;
		ConditionalClasses.styleTaskInputElement(task.isChecked, $taskInput);
		$taskInput.addEventListener('blur', () => $taskInput.focus());

		const $editTaskButton = document.createElement('button');
		$editTaskButton.classList.add(taskEditButtonClass);
		$editTaskButton.classList.add(taskButtonClass);
		$editTaskButton.innerHTML = editIcon;

		const $removeTaskButton = document.createElement('button');
		$removeTaskButton.classList.add(taskRemoveButtonClass);
		$removeTaskButton.classList.add(taskButtonClass);
		$removeTaskButton.innerHTML = removeIcon;

		$task.append($taskCheckbox, $taskInput, $editTaskButton, $removeTaskButton);
		if ($taskList) {
			$taskList.append($task);
		}
	}

	static renderAllTasks(): void {
		for (const task of tasks) {
			Render.renderNewTask(task);
		}
	}

	static addEventListenerToTaskList(): void {
		if ($taskList) {
			$taskList.addEventListener('click', (e: any) => {
				const $target = e.target;
				const $task = $target.closest(`.${taskLiClass}`);
				const $taskCheckbox = $task.children[0];
				const $taskInput = $task.children[1];
				const $taskEditButton = $task.children[2];
				const taskId = $task.dataset.id;

				if ($target) {
					// target is checkbox
					if ($target.classList.contains(taskCheckboxClass)) {
						ConditionalClasses.styleTaskLiElement($target.checked, $task);
						ConditionalClasses.styleTaskInputElement($target.checked, $task.children[1]);
						Tasks.setIsTaskCompletedById(taskId, $target.checked);
					}

					// target is edit button
					if ($target.classList.contains(taskEditButtonClass) || $target.closest(`.${taskEditButtonClass}`)) {
						if (!isEditing) {
							const allButtons = document.querySelectorAll('button');
							for (let i = 0; i < allButtons.length; i++) {
								if (allButtons[i] !== $taskEditButton) {
									allButtons[i].disabled = true;
								}
							}
							$taskEditButton.classList.add(taskButtonHighlightClass);
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
								ConditionalClasses.styleTaskInputElement($taskCheckbox.checked, $taskInput);
								$taskEditButton.classList.remove(taskButtonHighlightClass);
								Tasks.editTaskTitleById(taskId, $taskInput.value);
								isEditing = false;
							} else {
								$taskInput.focus();
							}
						}
					}

					// target is remove button
					if (
						$target.classList.contains(taskRemoveButtonClass) ||
						$target.closest(`.${taskRemoveButtonClass}`)
					) {
						Tasks.removeTaskById(taskId);
						$taskInput.removeEventListener('blur', () => $taskInput.focus());
						$task.remove();
					}
				}
			});
		}
	}

	static removeAllCheckedTasks(): void {
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

	static renderApp(): void {
		Render.renderAllTasks();
		Render.addEventListenerToTaskList();
		Progress.updateProgressBar();
	}
}

class ConditionalClasses {
	static styleTaskLiElement(isChecked: boolean, $task: HTMLLIElement): void {
		if (isChecked) {
			$task.classList.add(taskLiCheckedClass);
		} else {
			$task.classList.remove(taskLiCheckedClass);
		}
	}

	static styleTaskInputElement(isChecked: boolean, $taskInput: HTMLInputElement): void {
		if (isChecked) {
			$taskInput.classList.add(taskInputCheckedClass);
		} else {
			$taskInput.classList.remove(taskInputCheckedClass);
		}
	}
}

// new task submit event listener
$submitNewTaskForm?.addEventListener('submit', e => {
	e.preventDefault();

	if ($submitNewTaskInput?.value) {
		Tasks.pushNewTask($submitNewTaskInput.value);
		Render.renderNewTask(tasks[tasks.length - 1]);
		$submitNewTaskInput.value = '';
	}
});

// remove all checked tasks event listener
$removeAllCheckedTasksButton?.addEventListener('click', () => {
	if (tasks.length) {
		Tasks.removeAllCheckedTasks();
		Render.removeAllCheckedTasks();
	}
});

// add event listener when DOM loaded
window.addEventListener('DOMContentLoaded', () => {
	Render.renderApp();
});
