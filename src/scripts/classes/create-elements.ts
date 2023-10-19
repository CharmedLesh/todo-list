import { Task } from './task';
import { addToClassNameList } from '../helpers/add-to-class-name-list';
import { conditionalClassName } from '../helpers/conditional-class-name';
import { todoListAppClassNames, taskListClassNames } from '../../constants/class-names';
import { editIcon, removeIcon } from '../../constants/icons';

export class CreateElements {
	static createSpan(
		classNameOrClassNamesArray?: string | string[],
		id?: string,
		innerText?: string
	): HTMLSpanElement {
		const $span = document.createElement('span');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $span);
		}
		if (id) {
			$span.id = id;
		}
		if (innerText) {
			$span.innerText = innerText;
		}
		return $span;
	}

	static createForm(
		classNameOrClassNamesArray?: string | string[],
		id?: string,
		autocomplete?: boolean
	): HTMLFormElement {
		const $form = document.createElement('form');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $form);
		}
		if (id) {
			$form.id = id;
		}
		if (typeof autocomplete === 'boolean') {
			$form.autocomplete = autocomplete ? 'on' : 'off';
		}
		return $form;
	}

	static createDiv(classNameOrClassNamesArray?: string | string[], id?: string, innerText?: string): HTMLDivElement {
		const $div = document.createElement('div');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $div);
		}
		if (id) {
			$div.id = id;
		}
		if (innerText) {
			$div.innerText = innerText;
		}
		return $div;
	}

	static createUL(classNameOrClassNamesArray?: string | string[], id?: string): HTMLUListElement {
		const $ul = document.createElement('ul');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $ul);
		}
		if (id) {
			$ul.id = id;
		}
		return $ul;
	}

	static createLi(classNameOrClassNamesArray?: string | string[]): HTMLLIElement {
		const $li = document.createElement('li');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $li);
		}
		return $li;
	}

	static createCheckbox(classNameOrClassNamesArray?: string | string[], isChecked?: boolean): HTMLInputElement {
		const $checkbox = document.createElement('input');
		$checkbox.type = 'checkbox';
		if (isChecked) {
			$checkbox.checked = isChecked;
		}
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $checkbox);
		}
		return $checkbox;
	}

	static createInput(
		classNameOrClassNamesArray?: string | string[],
		id?: string,
		value?: string,
		placeholder?: string,
		type?: string,
		isDisabled?: boolean
	): HTMLInputElement {
		const $input = document.createElement('input');
		$input.spellcheck = false;
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $input);
		}
		if (id) {
			$input.id = id;
		}
		if (value) {
			$input.value = value;
		}
		if (placeholder) {
			$input.placeholder = placeholder;
		}
		if (type) {
			$input.type = type;
		}
		if (isDisabled) {
			$input.disabled = isDisabled;
		}
		return $input;
	}

	static createButton(
		classNameOrClassNamesArray?: string | string[],
		id?: string,
		innerText?: string,
		innerIcon?: string
	): HTMLButtonElement {
		const $button = document.createElement('button');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $button);
		}
		if (id) {
			$button.id = id;
		}
		if (innerIcon && innerText) {
			$button.innerHTML = `${innerText} ${innerIcon}`;
		} else {
			if (innerText) {
				$button.innerHTML = innerText;
			}
			if (innerIcon) {
				$button.innerHTML = innerIcon;
			}
		}

		return $button;
	}

	static createP(classNameOrClassNamesArray?: string | string[], id?: string): HTMLParagraphElement {
		const $p = document.createElement('p');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $p);
		}
		if (id) {
			$p.id = id;
		}
		return $p;
	}

	static createTodoListApp(ids: {
		todoListId: string;
		createTaskFormId: string;
		createTaskInputId: string;
		taskListId: string;
		progressBarProgressId: string;
		progressBarCompletedTasksNumberId: string;
		progressBarTotalTasksNumberId: string;
		removeCheckedButtonId: string;
	}): HTMLDivElement {
		// 'todo-list' block
		const $todoList: HTMLDivElement = CreateElements.createDiv(
			todoListAppClassNames.todoListClassName,
			ids.todoListId
		);
		const $todoListTitle: HTMLDivElement = CreateElements.createDiv(
			todoListAppClassNames.todoListTitleClassName,
			undefined,
			'TODOLIST'
		);
		const $todoListToolBar: HTMLDivElement = CreateElements.createDiv(
			todoListAppClassNames.todoListToolBarClassName
		);

		// 'create-task' block
		const $createTaskForm: HTMLFormElement = CreateElements.createForm(
			todoListAppClassNames.createTaskFormClassName,
			ids.createTaskFormId,
			false
		);
		const $createTaskInput: HTMLInputElement = CreateElements.createInput(
			todoListAppClassNames.createTaskInputClassName,
			ids.createTaskInputId,
			undefined,
			'what needs to be done?',
			'text',
			false
		);
		const $createTaskButton: HTMLButtonElement = CreateElements.createButton(
			todoListAppClassNames.createTaskButtonClassName,
			undefined,
			'+'
		);
		$createTaskForm.append($createTaskInput, $createTaskButton);

		// 'task-list' block
		const $taskList: HTMLUListElement = CreateElements.createUL(
			todoListAppClassNames.taskListClassName,
			ids.taskListId
		);

		// 'progress-bar' block
		const $progressBar: HTMLDivElement = CreateElements.createDiv(todoListAppClassNames.progressBarClassName);
		const $progressBarProgress: HTMLDivElement = CreateElements.createDiv(
			todoListAppClassNames.progressBarProgressClassName,
			ids.progressBarProgressId
		);
		const $progressBarText: HTMLParagraphElement = CreateElements.createP(
			todoListAppClassNames.progressBarTextClassName
		);
		const $progressBarComplitedNumber: HTMLSpanElement = CreateElements.createSpan(
			todoListAppClassNames.progressBarCompletedNumberClassName,
			ids.progressBarCompletedTasksNumberId
		);
		const $progressBarTotalNumber: HTMLSpanElement = CreateElements.createSpan(
			todoListAppClassNames.progressBarTotalNumberClassName,
			ids.progressBarTotalTasksNumberId
		);
		$progressBarText.append($progressBarComplitedNumber, ' of ', $progressBarTotalNumber, ' tasks done');
		$progressBar.append($progressBarProgress, $progressBarText);

		// 'remove-checked-button' block
		const $removeCheckedButton: HTMLButtonElement = CreateElements.createButton(
			todoListAppClassNames.removeCheckedButtonClassName,
			ids.removeCheckedButtonId,
			'Remove checked',
			removeIcon
		);

		$todoListToolBar.append($progressBar, $removeCheckedButton);
		$todoList.append($todoListTitle, $createTaskForm, $taskList, $todoListToolBar);
		return $todoList;
	}

	static createTaskElement(task: Task): HTMLLIElement {
		const $task = CreateElements.createLi(taskListClassNames.taskLiClass);
		const $taskCheckbox = CreateElements.createCheckbox(taskListClassNames.taskCheckboxClass, task.isChecked);
		conditionalClassName(task.isChecked, $task, taskListClassNames.taskLiCheckedClass);
		const $taskInput = CreateElements.createInput(
			taskListClassNames.taskInputClass,
			undefined,
			task.title,
			undefined,
			'text',
			true
		);
		conditionalClassName(task.isChecked, $taskInput, taskListClassNames.taskInputCheckedClass);
		$taskInput.addEventListener('blur', () => $taskInput.focus());
		const $taskEditButton = CreateElements.createButton(
			[taskListClassNames.taskButtonClass, taskListClassNames.taskEditButtonClass],
			undefined,
			undefined,
			editIcon
		);
		const $taskRemoveButton = CreateElements.createButton(
			[taskListClassNames.taskButtonClass, taskListClassNames.taskRemoveButtonClass],
			undefined,
			undefined,
			removeIcon
		);
		$task.append($taskCheckbox, $taskInput, $taskEditButton, $taskRemoveButton);
		return $task;
	}

	static createMultipleTaskElements(tasks: Task[]): HTMLLIElement[] {
		let multipleTaskElements: HTMLLIElement[] = [];
		for (const task of tasks) {
			const $task = CreateElements.createTaskElement(task);
			multipleTaskElements.push($task);
		}
		return multipleTaskElements;
	}
}
