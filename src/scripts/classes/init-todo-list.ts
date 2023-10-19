import { todoListAppClassNames } from '../../constants/class-names';
import { CreateElements } from './create-elements';
import { Render } from './render';
import { Task } from './task';
import { TaskList } from './task-list';

export class InitTodoList {
	taskList: TaskList;
	ids: {
		todoListId: string;
		createTaskFormId: string;
		createTaskInputId: string;
		taskListId: string;
		progressBarProgressId: string;
		progressBarCompletedTasksNumberId: string;
		progressBarTotalTasksNumberId: string;
		removeCheckedButtonId: string;
	};
	elements: {
		$taskList: HTMLUListElement | null;
		$createTaskForm: HTMLFormElement | null;
		$createTaskInput: HTMLInputElement | null;
		$progressBarProgress: HTMLDivElement | null;
		$progressBarCompletedTasksNumber: HTMLSpanElement | null;
		$progressBarTotalTasksNumber: HTMLSpanElement | null;
		$removeAllCheckedTasksButton: HTMLButtonElement | null;
	};

	private init() {
		// set callback function for taskList to update progressbar each time taskList modified
		const taskListCallbackFunction = () => {
			Render.rerenderProgressBar(
				this.taskList.tasks,
				this.elements.$progressBarProgress,
				this.elements.$progressBarCompletedTasksNumber,
				this.elements.$progressBarTotalTasksNumber
			);
		};
		this.taskList.setOnTaskListModified(taskListCallbackFunction);
		// update progress bar
		if (this.elements.$progressBarTotalTasksNumber) {
			if (this.elements.$progressBarCompletedTasksNumber) {
				if (this.elements.$progressBarProgress) {
					Render.rerenderProgressBar(
						this.taskList.tasks,
						this.elements.$progressBarProgress,
						this.elements.$progressBarCompletedTasksNumber,
						this.elements.$progressBarTotalTasksNumber
					);
				} else {
					console.error(`${this.ids.progressBarProgressId} not found`);
				}
			} else {
				console.error(`${this.ids.progressBarCompletedTasksNumberId} not found`);
			}
		} else {
			console.error(`${this.ids.progressBarTotalTasksNumberId} not found`);
		}
		// apply event listeners
		if (this.elements.$taskList) {
			if (this.elements.$createTaskForm) {
				if (this.elements.$createTaskInput) {
					this.applyListenerOnSubmitNewTaskEvent(
						this.elements.$createTaskForm,
						this.elements.$createTaskInput,
						this.elements.$taskList
					);
				} else {
					console.error(`${this.ids.createTaskInputId} not found`);
				}
			} else {
				console.error(`${this.ids.createTaskFormId} not found`);
			}

			if (this.elements.$removeAllCheckedTasksButton) {
				this.applyListenerOnRemoveAllCheckedTasksEvent(
					this.elements.$removeAllCheckedTasksButton,
					this.elements.$taskList
				);
			} else {
				console.error(`${this.ids.removeCheckedButtonId} not found`);
			}
		} else {
			console.error(`${this.ids.taskListId} not found`);
		}
	}

	constructor({ appId, key }: { appId: string; key: string }) {
		// need to render skeleton before init
		this.ids = this.initElementsIds(appId);
		const $todoList = CreateElements.createTodoListApp(this.ids);
		Render.renderElementInBody($todoList);
		this.elements = this.initElementsObject();
		const $taskList = this.elements.$taskList;
		this.taskList = new TaskList({ key, $taskList });
		this.init();
	}

	private initElementsIds(appId: string): {
		todoListId: string;
		createTaskFormId: string;
		createTaskInputId: string;
		taskListId: string;
		progressBarProgressId: string;
		progressBarCompletedTasksNumberId: string;
		progressBarTotalTasksNumberId: string;
		removeCheckedButtonId: string;
	} {
		const todoListId: string = `${todoListAppClassNames.todoListClassName}--${appId}`;
		const createTaskFormId: string = `${todoListAppClassNames.createTaskFormClassName}--${appId}`;
		const createTaskInputId: string = `${todoListAppClassNames.createTaskInputClassName}--${appId}`;
		const taskListId: string = `${todoListAppClassNames.taskListClassName}--${appId}`;
		const progressBarProgressId: string = `${todoListAppClassNames.progressBarProgressClassName}--${appId}`;
		const progressBarCompletedTasksNumberId: string = `${todoListAppClassNames.progressBarCompletedNumberClassName}--${appId}`;
		const progressBarTotalTasksNumberId: string = `${todoListAppClassNames.progressBarTotalNumberClassName}--${appId}`;
		const removeCheckedButtonId: string = `${todoListAppClassNames.removeCheckedButtonClassName}--${appId}`;
		const ids = {
			todoListId: todoListId,
			createTaskFormId: createTaskFormId,
			createTaskInputId: createTaskInputId,
			taskListId: taskListId,
			progressBarProgressId: progressBarProgressId,
			progressBarCompletedTasksNumberId: progressBarCompletedTasksNumberId,
			progressBarTotalTasksNumberId: progressBarTotalTasksNumberId,
			removeCheckedButtonId: removeCheckedButtonId
		};
		return ids;
	}

	private initElementsObject(): {
		$taskList: HTMLUListElement | null;
		$createTaskForm: HTMLFormElement | null;
		$createTaskInput: HTMLInputElement | null;
		$progressBarProgress: HTMLDivElement | null;
		$progressBarCompletedTasksNumber: HTMLSpanElement | null;
		$progressBarTotalTasksNumber: HTMLSpanElement | null;
		$removeAllCheckedTasksButton: HTMLButtonElement | null;
	} {
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
			$taskList: $taskList,
			$createTaskForm: $createTaskForm,
			$createTaskInput: $createTaskInput,
			$progressBarProgress: $progressBarProgress,
			$progressBarCompletedTasksNumber: $progressBarCompletedTasksNumber,
			$progressBarTotalTasksNumber: $progressBarTotalTasksNumber,
			$removeAllCheckedTasksButton: $removeAllCheckedTasksButton
		};
		return elements;
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
