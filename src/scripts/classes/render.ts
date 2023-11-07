import { Task } from './task';
import { Logger } from './logger';

export class Render {
	static renderElementInBody($element: HTMLDivElement | null): void {
		try {
			if (!$element) {
				throw new Error('Element not porvided');
			}
			document.body.append($element);
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	static renderTask($task: HTMLLIElement | null, $taskList: HTMLUListElement | null): void {
		try {
			if (!$taskList) {
				throw new Error('Task list not provided');
			}
			if (!$task) {
				throw new Error('Task element not provided');
			}
			$taskList.append($task);
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	static renderTaskList(multipleTaskElements: HTMLLIElement[], $taskList: HTMLUListElement | null): void {
		try {
			if (!$taskList) {
				throw new Error('Task list not provided');
			}
			for (const $task of multipleTaskElements) {
				Render.renderTask($task, $taskList);
			}
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	static rerenderProgressBar(
		tasks: Task[],
		$progressBarProgress: HTMLDivElement | null,
		$progressBarCompletedTasksNumber: HTMLSpanElement | null,
		$progressBarTotalTasksNumber: HTMLSpanElement | null
	): void {
		try {
			if (!$progressBarProgress) {
				throw new Error('Progress element not provided');
			}
			if (!$progressBarCompletedTasksNumber) {
				throw new Error('Completed tasks element not provided');
			}
			if (!$progressBarTotalTasksNumber) {
				throw new Error('Total tasks element not provided');
			}

			const totalTasksCount: number = tasks.length;
			const completedTasksCount: number = tasks.reduce((count, task) => count + (task.isChecked ? 1 : 0), 0);
			const progress = (completedTasksCount / totalTasksCount) * 100;
			$progressBarProgress.style.width = progress ? `${progress}%` : '0%';
			$progressBarCompletedTasksNumber.innerHTML = completedTasksCount.toString();
			$progressBarTotalTasksNumber.innerHTML = totalTasksCount.toString();
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	static unrenderAllCheckedFromTaskList($taskList: HTMLUListElement | null): void {
		try {
			if (!$taskList) {
				throw new Error('Task list not provided');
			}

			const tasksCollection = $taskList.children;
			for (let i = 0; i < tasksCollection.length; i++) {
				const $task = tasksCollection[i];
				const $checkbox = $task.children[0] as HTMLInputElement;
				const isChecked = $checkbox.checked;

				if (isChecked) {
					$task.remove();
					i--;
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}
}
