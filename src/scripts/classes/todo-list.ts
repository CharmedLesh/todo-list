import { Task } from './task';
import { TaskList } from './task-list';
import { CreateElements } from './create-elements';
import { Render } from './render';
import { Logger } from './logger';
import { todoListAppClassNames } from '../../constants/class-names';
import { IElements } from '../interfaces/interfaces';

export class TodoList {
	taskList: TaskList;
	elements: IElements;

	constructor({ appId, key }: { appId: string; key: string }) {
		const $todoList = CreateElements.createTodoListApp(appId);
		Render.renderElementInBody($todoList);
		this.elements = this.initElementsObject(appId);
		this.taskList = new TaskList({ key: key, $taskList: this.elements.$taskList });
		this.init();
	}

	private init() {
		// set callback function for taskList to update progressbar each time taskList modified
		this.initCallbackToRerenderProgressBarOnTaskListChange();
		// update progress bar
		this.initProgressBarRender();
		// apply event listeners
		this.initEventListeners();
	}

	private initElementsObject(appId: string): IElements {
		const $app = document.getElementById(`js-todo-list--${appId}`) as HTMLDivElement | null;
		const $taskList = $app?.querySelector(`.${todoListAppClassNames.taskListClassName}`) as HTMLUListElement | null;
		const $createTaskForm = $app?.querySelector(
			`.${todoListAppClassNames.createTaskClassNames.createTaskFormClassName}`
		) as HTMLFormElement | null;
		const $createTaskInput = $app?.querySelector(
			`.${todoListAppClassNames.createTaskClassNames.createTaskInputClassName}`
		) as HTMLInputElement | null;
		const $progressBarProgress = $app?.querySelector(
			`.${todoListAppClassNames.progressBarClassNames.progressBarProgressClassName}`
		) as HTMLDivElement | null;
		const $progressBarCompletedTasksNumber = $app?.querySelector(
			`.${todoListAppClassNames.progressBarClassNames.progressBarCompletedNumberClassName}`
		) as HTMLSpanElement | null;
		const $progressBarTotalTasksNumber = $app?.querySelector(
			`.${todoListAppClassNames.progressBarClassNames.progressBarTotalNumberClassName}`
		) as HTMLSpanElement | null;
		const $removeAllCheckedTasksButton = $app?.querySelector(
			`.${todoListAppClassNames.removeCheckedButtonClassName}`
		) as HTMLButtonElement | null;

		const elements = {
			$taskList,
			$createTaskForm,
			$createTaskInput,
			$progressBarProgress,
			$progressBarCompletedTasksNumber,
			$progressBarTotalTasksNumber,
			$removeAllCheckedTasksButton
		};
		return elements;
	}

	private initCallbackToRerenderProgressBarOnTaskListChange() {
		const taskListCallbackFunction = () => {
			Render.rerenderProgressBar(
				this.taskList.tasks,
				this.elements.$progressBarProgress,
				this.elements.$progressBarCompletedTasksNumber,
				this.elements.$progressBarTotalTasksNumber
			);
		};
		this.taskList.setOnTaskListModified(taskListCallbackFunction);
	}

	private initProgressBarRender() {
		try {
			if (!this.elements.$progressBarTotalTasksNumber) {
				throw new Error('Element not found');
			}
			if (!this.elements.$progressBarCompletedTasksNumber) {
				throw new Error('Element not found');
			}
			if (!this.elements.$progressBarProgress) {
				throw new Error('Element not found');
			}

			Render.rerenderProgressBar(
				this.taskList.tasks,
				this.elements.$progressBarProgress,
				this.elements.$progressBarCompletedTasksNumber,
				this.elements.$progressBarTotalTasksNumber
			);
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	private initEventListeners() {
		try {
			if (!this.elements.$taskList) {
				throw new Error('Element not found');
			}
			if (!this.elements.$createTaskForm) {
				throw new Error('Element not found');
			}
			if (!this.elements.$createTaskInput) {
				throw new Error('Element not found');
			}
			if (!this.elements.$removeAllCheckedTasksButton) {
				throw new Error('Element not found');
			}

			this.applyListenerOnSubmitNewTaskEvent(
				this.elements.$createTaskForm,
				this.elements.$createTaskInput,
				this.elements.$taskList
			);
			this.applyListenerOnRemoveAllCheckedTasksEvent(
				this.elements.$removeAllCheckedTasksButton,
				this.elements.$taskList
			);
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	private applyListenerOnSubmitNewTaskEvent(
		$createTaskForm: HTMLFormElement,
		$createTaskInput: HTMLInputElement,
		$taskList: HTMLUListElement
	): void {
		$createTaskForm.addEventListener('submit', e => {
			e.preventDefault();

			if ($createTaskInput.value) {
				const newTask: Task = new Task({ title: $createTaskInput.value, isChecked: false });
				this.taskList.push(newTask);
				const $task = CreateElements.createTaskElement(newTask);
				Render.renderTask($task, $taskList);
				$createTaskInput.value = '';
			}
		});
	}

	private applyListenerOnRemoveAllCheckedTasksEvent(
		$removeAllCheckedTasksButton: HTMLButtonElement,
		$taskList: HTMLUListElement
	): void {
		$removeAllCheckedTasksButton.addEventListener('click', () => {
			if (this.taskList.tasks.length) {
				this.taskList.removeAllChecked();
				Render.unrenderAllCheckedFromTaskList($taskList);
			}
		});
	}
}
