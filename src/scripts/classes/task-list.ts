import { ITask } from '../interfaces/interfaces';
import { LocalStorage } from './local-storage';
import { Task } from './task';
import { CreateElements } from './create-elements';
import { ClassName } from './class-name';
import { Render } from './render';
import { taskListClassNames } from '../../constants/class-names';

type ID = string;

export class TaskList {
	localStorage: LocalStorage<ITask[]>;
	$taskList: HTMLUListElement | null;
	tasks: Task[];
	private onTaskListModified: (() => void) | null = null;

	private initTasksArray(): Task[] {
		const tasksFromLocalStorage: ITask[] | null = this.localStorage.get();
		if (tasksFromLocalStorage) {
			let taskInstanceArray = [];
			for (const taskFromLocalStorage of tasksFromLocalStorage) {
				const taskInstance: Task = new Task({
					title: taskFromLocalStorage.title,
					isChecked: taskFromLocalStorage.isChecked
				});
				taskInstanceArray.push(taskInstance);
			}
			return taskInstanceArray;
		}
		return [];
	}

	private init() {
		if (this.$taskList) {
			// render task list
			const multipleTaskElements = CreateElements.createMultipleTaskElements(this.tasks);
			Render.renderTaskList(multipleTaskElements, this.$taskList);
			// apply event listener to task list
			this.addTaskListEventListener(this.$taskList);
		} else {
			console.error('HTMLUListElement not provided');
		}
	}

	constructor({ key, $taskList }: { key: string; $taskList: HTMLUListElement | null }) {
		this.localStorage = new LocalStorage<ITask[]>({ key });
		this.$taskList = $taskList;
		this.tasks = this.initTasksArray();
		this.init();
	}

	// callback function to call when tasks are modified
	setOnTaskListModified(callback: () => void) {
		this.onTaskListModified = callback;
	}

	// helper function to call the callback if it is set
	private callOnTaskListModified() {
		if (this.onTaskListModified) {
			this.onTaskListModified();
		}
	}

	private save(): void {
		this.localStorage.set(this.tasks);
		this.callOnTaskListModified();
	}

	push(task: Task): void {
		this.tasks.push(task);
		this.save();
	}

	check(taskOrId: ID | Task): void {
		if (taskOrId instanceof Task) {
			taskOrId.check();
		} else {
			const taskIndex = this.tasks.findIndex(task => task.id === taskOrId);
			this.tasks[taskIndex].check();
		}
		this.save();
	}

	edit(taskOrId: ID | Task, newTitle: string): void {
		if (taskOrId instanceof Task) {
			taskOrId.editTitle(newTitle);
		} else {
			const taskIndex = this.tasks.findIndex(task => task.id === taskOrId);
			this.tasks[taskIndex].editTitle(newTitle);
		}
		this.save();
	}

	remove(taskOrId: ID | Task): void {
		const id = taskOrId instanceof Task ? taskOrId.getId() : taskOrId;
		this.tasks = this.tasks.filter(task => task.id !== id);
		this.save();
	}

	removeAllChecked(): void {
		this.tasks = this.tasks.filter(task => task.isChecked === false);
		this.save();
	}

	private addTaskListEventListener($taskList: HTMLUListElement): void {
		$taskList.addEventListener('click', (e: any) => {
			const $target = e.target;
			const $task = $target.closest(`.${taskListClassNames.taskLiClass}`);
			const $taskCheckbox = $task.children[0] as HTMLInputElement;
			const $taskInput = $task.children[1] as HTMLInputElement;
			const $taskEditButton = $task.children[2] as HTMLButtonElement;
			const taskIndex = [...$task.parentNode.children].indexOf($task);
			if ($target) {
				// target is checkbox
				if ($target.classList.contains(taskListClassNames.taskCheckboxClass)) {
					this.taskCheckboxListener($task as HTMLLIElement, taskIndex, $target.checked, $taskInput);
				}
				// target is edit button
				if (
					$target.classList.contains(taskListClassNames.taskEditButtonClass) ||
					$target.closest(`.${taskListClassNames.taskEditButtonClass}`)
				) {
					this.taskEditButtonListener($taskEditButton, $taskInput, taskIndex, $taskCheckbox.checked);
				}
				// target is remove button
				if (
					$target.classList.contains(taskListClassNames.taskRemoveButtonClass) ||
					$target.closest(`.${taskListClassNames.taskRemoveButtonClass}`)
				) {
					this.taskRemoveButtonListener($task as HTMLLIElement, taskIndex, $taskInput);
				}
			}
		});
	}

	private taskCheckboxListener(
		$task: HTMLLIElement,
		taskIndex: number,
		isChecked: boolean,
		$taskInput: HTMLInputElement
	): void {
		ClassName.conditionalClassName(isChecked, $task, taskListClassNames.taskLiCheckedClass);
		if ($taskInput.disabled) {
			ClassName.conditionalClassName(isChecked, $taskInput, taskListClassNames.taskInputCheckedClass);
		}
		this.check(this.tasks[taskIndex]);
	}

	private taskEditButtonListener(
		$taskEditButton: HTMLButtonElement,
		$taskInput: HTMLInputElement,
		taskIndex: number,
		isChecked: boolean
	): void {
		if ($taskInput.disabled) {
			const allButtons = document.querySelectorAll('button');
			for (let i = 0; i < allButtons.length; i++) {
				if (allButtons[i] !== $taskEditButton) {
					allButtons[i].disabled = true;
				}
			}
			$taskEditButton.classList.add(taskListClassNames.taskButtonHighlightClass);
			$taskInput.classList.remove(taskListClassNames.taskInputCheckedClass);
			$taskInput.disabled = false;
			$taskInput.focus();
		} else {
			if ($taskInput.value) {
				const allButtons = document.querySelectorAll('button');
				for (let i = 0; i < allButtons.length; i++) {
					allButtons[i].disabled = false;
				}
				$taskInput.disabled = true;
				ClassName.conditionalClassName(isChecked, $taskInput, taskListClassNames.taskInputCheckedClass);
				$taskEditButton.classList.remove(taskListClassNames.taskButtonHighlightClass);
				this.edit(this.tasks[taskIndex], $taskInput.value);
			} else {
				$taskInput.focus();
			}
		}
	}

	private taskRemoveButtonListener($task: HTMLLIElement, taskIndex: number, $taskInput: HTMLInputElement): void {
		this.remove(this.tasks[taskIndex]);
		$taskInput.removeEventListener('blur', () => $taskInput.focus());
		$task.remove();
	}
}
