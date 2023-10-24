import { ITask } from '../interfaces/interfaces';
import { taskClassNames } from '../constants/class-names';
import { editIcon, removeIcon } from '../constants/icons';
import { conditionalClassName } from './helpers/conditional-class-name';
import { saveTasksToLocalStorage } from './tasks-local-storage';
import { elements } from '../constants/elements';
import {
	changeDisabledStatusForAllButtonsExceptSpecificOne,
	changeDisabledStatusForAllCheckboxes
} from './helpers/change-disabled-status';

export function createTask(
	tasks: ITask[],
	task: ITask,
	isEditing: boolean,
	setIsTaskCheckedToArray: (task: ITask, isCompleted: boolean) => void,
	removeTaskFromArray: (id: string) => void
): void {
	const $task = document.createElement('li');
	$task.classList.add(taskClassNames.taskLiClass);

	const $taskCheckbox = document.createElement('input');
	$taskCheckbox.classList.add(taskClassNames.taskCheckboxClass);
	$taskCheckbox.type = 'checkbox';
	$taskCheckbox.checked = task.isCompleted;
	conditionalClassName($taskCheckbox.checked, $task, taskClassNames.taskLiCheckedClass);
	$taskCheckbox.addEventListener('change', taskCheckboxClickHandler);
	function taskCheckboxClickHandler(): void {
		setIsTaskCheckedToArray(task, $taskCheckbox.checked);
		conditionalClassName($taskCheckbox.checked, $task, taskClassNames.taskLiCheckedClass);
		conditionalClassName($taskCheckbox.checked, $taskInput, taskClassNames.taskInputCheckedClass);
		saveTasksToLocalStorage(tasks);
	}

	const $taskInput = document.createElement('input');
	$taskInput.classList.add(taskClassNames.taskInputClass);
	$taskInput.value = task.title;
	$taskInput.disabled = true;
	$taskInput.spellcheck = false;
	conditionalClassName($taskCheckbox.checked, $taskInput, taskClassNames.taskInputCheckedClass);
	$taskInput.addEventListener('blur', () => $taskInput.focus());
	$taskInput.addEventListener('keyup', EscOrEnterKeyUpHandler);
	function EscOrEnterKeyUpHandler(e: KeyboardEvent) {
		if (e.code === 'Escape' || e.code === 'Enter') {
			editTaskButtonClickHandler();
		}
	}

	const $editTaskButton = document.createElement('button');
	$editTaskButton.classList.add(taskClassNames.taskEditButtonClass);
	$editTaskButton.innerHTML = editIcon;
	$editTaskButton.addEventListener('click', editTaskButtonClickHandler);
	function editTaskButtonClickHandler(): void {
		if (!isEditing) {
			// disable all buttons
			changeDisabledStatusForAllButtonsExceptSpecificOne(true, $editTaskButton);
			// disable all checkboxes
			changeDisabledStatusForAllCheckboxes(true);
			//
			$editTaskButton.classList.add(taskClassNames.taskEditButtonHighlightedClass);
			$taskInput.classList.remove(taskClassNames.taskInputCheckedClass);
			$taskInput.disabled = false;
			$taskInput.focus();
			isEditing = true;
		} else {
			if ($taskInput.value) {
				// disable all buttons
				changeDisabledStatusForAllButtonsExceptSpecificOne(false, $editTaskButton);
				// disable all checkboxes
				changeDisabledStatusForAllCheckboxes(false);
				//
				$taskInput.disabled = true;
				conditionalClassName($taskCheckbox.checked, $taskInput, taskClassNames.taskInputCheckedClass);
				$editTaskButton.classList.remove(taskClassNames.taskEditButtonHighlightedClass);
				task.title = $taskInput.value;
				saveTasksToLocalStorage(tasks);
				isEditing = false;
			} else {
				$taskInput.focus();
			}
		}
	}

	const $removeTaskButton = document.createElement('button');
	$removeTaskButton.classList.add(taskClassNames.taskRemoveButtonClass);
	$removeTaskButton.innerHTML = removeIcon;
	$removeTaskButton.addEventListener('click', removeTaskButtonClickHandler);
	function removeTaskButtonClickHandler(): void {
		removeTaskFromArray(task.id);
		saveTasksToLocalStorage(tasks);
		$taskCheckbox.removeEventListener('change', taskCheckboxClickHandler);
		$taskInput.removeEventListener('blur', () => $taskInput.focus());
		$taskInput.removeEventListener('keyup', EscOrEnterKeyUpHandler);
		$removeTaskButton.removeEventListener('click', removeTaskButtonClickHandler);
		$task.remove();
	}

	$task.append($taskCheckbox, $taskInput, $editTaskButton, $removeTaskButton);
	elements.$taskList?.append($task);
	saveTasksToLocalStorage(tasks);
}
