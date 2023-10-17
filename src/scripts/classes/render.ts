import { Task } from './task';
import { TaskList } from './task-list';
import { TaskListListener } from './task-list-listener';
import { createTaskElement } from '../helpers/create-task-element';

export class Render {
	static renderTask(task: Task, $taskList: HTMLUListElement | null): void {
		const $task = createTaskElement(task);
		if ($taskList) {
			$taskList.append($task);
		}
	}

	static renderTaskList(tasks: Task[], $taskList: HTMLUListElement | null): void {
		if ($taskList) {
			for (const task of tasks) {
				Render.renderTask(task, $taskList);
			}
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
		}
	}

	static renderApp(taskList: TaskList, $taskList: HTMLUListElement | null): void {
		Render.renderTaskList(taskList.tasks, $taskList);
		TaskListListener.addTaskListEventListener($taskList, taskList);
	}
}
