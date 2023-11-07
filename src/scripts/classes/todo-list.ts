import { Task } from './task';
import { TaskList } from './task-list';
import { CreateElements } from './create-elements';
import { Render } from './render';
import { todoListAppClassNames } from '../../constants/class-names';
import { IElements, IElementsIds } from '../interfaces/interfaces';

export class TodoList {
	taskList: TaskList;
	ids: IElementsIds;
	elements: IElements;

	constructor({ appId, key }: { appId: string; key: string }) {
		// need to render skeleton before init
		this.ids = this.initElementsIds(appId);
		const $todoList = CreateElements.createTodoListApp(this.ids);
		Render.renderElementInBody($todoList);
		this.elements = this.initElementsObject();
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

	private initElementsIds(appId: string): IElementsIds {
		const todoListId: string = `${todoListAppClassNames.todoListClassNames.todoListClassName}--${appId}`;
		const createTaskFormId: string = `${todoListAppClassNames.createTaskClassNames.createTaskFormClassName}--${appId}`;
		const createTaskInputId: string = `${todoListAppClassNames.createTaskClassNames.createTaskInputClassName}--${appId}`;
		const taskListId: string = `${todoListAppClassNames.taskListClassName}--${appId}`;
		const progressBarProgressId: string = `${todoListAppClassNames.progressBarClassNames.progressBarProgressClassName}--${appId}`;
		const progressBarCompletedTasksNumberId: string = `${todoListAppClassNames.progressBarClassNames.progressBarCompletedNumberClassName}--${appId}`;
		const progressBarTotalTasksNumberId: string = `${todoListAppClassNames.progressBarClassNames.progressBarTotalNumberClassName}--${appId}`;
		const removeCheckedButtonId: string = `${todoListAppClassNames.removeCheckedButtonClassName}--${appId}`;
		const ids = {
			todoListId,
			createTaskFormId,
			createTaskInputId,
			taskListId,
			progressBarProgressId,
			progressBarCompletedTasksNumberId,
			progressBarTotalTasksNumberId,
			removeCheckedButtonId
		};
		return ids;
	}

	private initElementsObject(): IElements {
		const $createTaskForm: HTMLFormElement | null = document.getElementById(
			this.ids.createTaskFormId
		) as HTMLFormElement | null;
		const $createTaskInput: HTMLInputElement | null = document.getElementById(
			this.ids.createTaskInputId
		) as HTMLInputElement | null;
		const $taskList: HTMLUListElement | null = document.getElementById(
			this.ids.taskListId
		) as HTMLUListElement | null;
		const $progressBarProgress: HTMLDivElement | null = document.getElementById(
			this.ids.progressBarProgressId
		) as HTMLDivElement | null;
		const $progressBarCompletedTasksNumber: HTMLSpanElement | null = document.getElementById(
			this.ids.progressBarCompletedTasksNumberId
		);
		const $progressBarTotalTasksNumber: HTMLSpanElement | null = document.getElementById(
			this.ids.progressBarTotalTasksNumberId
		);
		const $removeAllCheckedTasksButton: HTMLButtonElement | null = document.getElementById(
			this.ids.removeCheckedButtonId
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
				throw new Error(`${this.ids.progressBarTotalTasksNumberId} not found`);
			}
			if (!this.elements.$progressBarCompletedTasksNumber) {
				throw new Error(`${this.ids.progressBarCompletedTasksNumberId} not found`);
			}
			if (!this.elements.$progressBarProgress) {
				throw new Error(`${this.ids.progressBarProgressId} not found`);
			}

			Render.rerenderProgressBar(
				this.taskList.tasks,
				this.elements.$progressBarProgress,
				this.elements.$progressBarCompletedTasksNumber,
				this.elements.$progressBarTotalTasksNumber
			);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	private initEventListeners() {
		try {
			if (!this.elements.$taskList) {
				throw new Error(`${this.ids.taskListId} not found`);
			}
			if (!this.elements.$createTaskForm) {
				throw new Error(`${this.ids.createTaskFormId} not found`);
			}
			if (!this.elements.$createTaskInput) {
				throw new Error(`${this.ids.createTaskInputId} not found`);
			}
			if (!this.elements.$removeAllCheckedTasksButton) {
				throw new Error(`${this.ids.removeCheckedButtonId} not found`);
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
				console.error(error.message);
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
