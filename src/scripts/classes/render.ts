import { Task } from './task';

export class Render {
	static renderElementInBody($element: HTMLDivElement | null): void {
		if ($element) {
			document.body.append($element);
		} else {
			console.error('id for todo list not provided');
		}
	}

	static renderTask($task: HTMLLIElement | null, $taskList: HTMLUListElement | null): void {
		if ($taskList) {
			if ($task) {
				$taskList.append($task);
			} else {
				console.error('HTMLLIElement not provided');
			}
		} else {
			console.error('HTMLUListElement not provided');
		}
	}

	static renderTaskList(multipleTaskElements: HTMLLIElement[], $taskList: HTMLUListElement | null): void {
		if ($taskList) {
			for (const $task of multipleTaskElements) {
				Render.renderTask($task, $taskList);
			}
		} else {
			console.error('HTMLUListElement not provided');
		}
	}

	static rerenderProgressBar(
		tasks: Task[],
		$progressBarProgress: HTMLDivElement | null,
		$progressBarCompletedTasksNumber: HTMLSpanElement | null,
		$progressBarTotalTasksNumber: HTMLSpanElement | null
	): void {
		const totalTasksCount: number = tasks.length;
		const completedTasksCount: number = tasks.reduce((count, task) => count + (task.isChecked ? 1 : 0), 0);

		if ($progressBarProgress) {
			const progress = (completedTasksCount / totalTasksCount) * 100;
			if (progress) {
				$progressBarProgress.style.width = `${progress}%`;
			} else {
				$progressBarProgress.style.width = `0%`;
			}
		} else {
			console.error('HTMLDivElement not provided');
		}

		if ($progressBarCompletedTasksNumber) {
			$progressBarCompletedTasksNumber.innerHTML = completedTasksCount.toString();
		} else {
			console.error('HTMLSpanElement not provided');
		}

		if ($progressBarTotalTasksNumber) {
			$progressBarTotalTasksNumber.innerHTML = totalTasksCount.toString();
		} else {
			console.error('HTMLSpanElement not provided');
		}
	}

	static unrenderAllCheckedFromTaskList($taskList: HTMLUListElement | null): void {
		if ($taskList) {
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
		} else {
			console.error('HTMLUListElement not provided');
		}
	}
}
