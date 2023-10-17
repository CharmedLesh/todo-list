import { Task } from './task';
import { TaskList } from './task-list';
import { TaskListListener } from './task-list-listener';
import { createTaskElement } from '../helpers/create-task-element';

export class Render {
	static renderTask(task: Task, $taskList: HTMLUListElement | null) {
		const $task = createTaskElement(task);
		if ($taskList) {
			$taskList.append($task);
		}
	}

	static renderTaskList(tasks: Task[], $taskList: HTMLUListElement | null) {
		if ($taskList) {
			for (const task of tasks) {
				Render.renderTask(task, $taskList);
			}
		}
	}

	static renderApp(taskList: TaskList, $taskList: HTMLUListElement | null) {
		Render.renderTaskList(taskList.tasks, $taskList);
		TaskListListener.addTaskListEventListener($taskList, taskList);
	}
}
