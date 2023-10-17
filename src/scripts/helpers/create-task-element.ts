import { Task } from '../classes/task';
import { CreateElements } from '../classes/create-elements';
import { conditionalClassName } from './conditional-class-name';
import { classNames } from '../../constants/class-names';
import { editIcon } from '../../constants/icons';
import { removeIcon } from '../../constants/icons';

export const createTaskElement = (task: Task) => {
	const $task = CreateElements.createLi(classNames.taskLiClass);
	const $taskCheckbox = CreateElements.createCheckbox(classNames.taskCheckboxClass, task.isChecked);
	conditionalClassName(task.isChecked, $task, classNames.taskLiCheckedClass);
	const $taskInput = CreateElements.createInput(classNames.taskInputClass, task.title, true);
	conditionalClassName(task.isChecked, $taskInput, classNames.taskInputCheckedClass);
	$taskInput.addEventListener('blur', () => $taskInput.focus());
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
	return $task;
};
