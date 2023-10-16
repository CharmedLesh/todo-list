import { CreateElements } from './create-elements';
import { Task } from './task';
import { classNames } from '../constants/class-names';
import { editIcon } from '../constants/icons';
import { removeIcon } from '../constants/icons';

export class Render {
	static renderTask(task: Task, $taskList: HTMLUListElement | null) {
		const $task = CreateElements.createLi(classNames.taskLiClass);
		const $taskCheckbox = CreateElements.createCheckbox(classNames.taskCheckboxClass, task.isChecked);
		const $taskInput = CreateElements.createInput(classNames.taskInputClass, task.title, true);
		const $taskEditButton = CreateElements.createButton(
			[classNames.taskButtonClass, classNames.taskEditButtonClass],
			undefined,
			editIcon
		);
		const $taskRemoveButton = CreateElements.createButton(
			[classNames.taskButtonClass, classNames.taskRemoveButtonClass],
			undefined,
			removeIcon
		);
		$task.append($taskCheckbox, $taskInput, $taskEditButton, $taskRemoveButton);
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
}
