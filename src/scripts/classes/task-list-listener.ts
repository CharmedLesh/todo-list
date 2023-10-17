import { TaskList } from './task-list';
import { conditionalClassName } from '../helpers/conditional-class-name';
import { classNames } from '../../constants/class-names';

export class TaskListListener {
	static addTaskListEventListener($taskList: HTMLUListElement | null, taskList: TaskList): void {
		if ($taskList) {
			$taskList.addEventListener('click', (e: any) => {
				const $target = e.target;
				const $task = $target.closest(`.${classNames.taskLiClass}`);
				const $taskCheckbox = $task.children[0] as HTMLInputElement;
				const $taskInput = $task.children[1] as HTMLInputElement;
				const $taskEditButton = $task.children[2] as HTMLButtonElement;
				const taskIndex = [...$task.parentNode.children].indexOf($task);
				if ($target) {
					// target is checkbox
					if ($target.classList.contains(classNames.taskCheckboxClass)) {
						TaskListListener.taskCheckboxListener(
							taskList,
							$task as HTMLLIElement,
							taskIndex,
							$target.checked,
							$taskInput
						);
					}
					// target is edit button
					if (
						$target.classList.contains(classNames.taskEditButtonClass) ||
						$target.closest(`.${classNames.taskEditButtonClass}`)
					) {
						TaskListListener.taskEditButtonListener(
							taskList,
							$taskEditButton,
							$taskInput,
							taskIndex,
							$taskCheckbox.checked
						);
					}
					// target is remove button
					if (
						$target.classList.contains(classNames.taskRemoveButtonClass) ||
						$target.closest(`.${classNames.taskRemoveButtonClass}`)
					) {
						TaskListListener.taskRemoveButtonListener(
							taskList,
							$task as HTMLLIElement,
							taskIndex,
							$taskInput
						);
					}
				}
			});
		}
	}

	static taskCheckboxListener(
		taskList: TaskList,
		$task: HTMLLIElement,
		taskIndex: number,
		isChecked: boolean,
		$taskInput: HTMLInputElement
	): void {
		conditionalClassName(isChecked, $task, classNames.taskLiCheckedClass);
		conditionalClassName(isChecked, $taskInput, classNames.taskInputCheckedClass);
		taskList.check(taskList.tasks[taskIndex]);
	}

	static taskEditButtonListener(
		taskList: TaskList,
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
			$taskEditButton.classList.add(classNames.taskButtonHighlightClass);
			$taskInput.classList.remove(classNames.taskInputCheckedClass);
			$taskInput.disabled = false;
			$taskInput.focus();
		} else {
			if ($taskInput.value) {
				const allButtons = document.querySelectorAll('button');
				for (let i = 0; i < allButtons.length; i++) {
					allButtons[i].disabled = false;
				}
				$taskInput.disabled = true;
				conditionalClassName(isChecked, $taskInput, classNames.taskInputCheckedClass);
				$taskEditButton.classList.remove(classNames.taskButtonHighlightClass);
				taskList.edit(taskList.tasks[taskIndex], $taskInput.value);
			} else {
				$taskInput.focus();
			}
		}
	}

	static taskRemoveButtonListener(
		taskList: TaskList,
		$task: HTMLLIElement,
		taskIndex: number,
		$taskInput: HTMLInputElement
	): void {
		taskList.remove(taskList.tasks[taskIndex]);
		$taskInput.removeEventListener('blur', () => $taskInput.focus());
		$task.remove();
	}
}
