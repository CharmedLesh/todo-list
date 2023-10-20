// todo list
const todoListClassName: string = 'js-todo-list';
const todoListTitleClassName: string = `${todoListClassName}__title`;
const createTaskFormClassName: string = 'js-create-task';
const createTaskInputClassName: string = `${createTaskFormClassName}__input`;
const createTaskButtonClassName: string = `${createTaskFormClassName}__button`;
const taskListClassName: string = 'js-task-list';
const todoListToolBarClassName: string = `${todoListClassName}__toolbar`;
const progressBarClassName: string = 'js-progress-bar';
const progressBarProgressClassName: string = `${progressBarClassName}__progress`;
const progressBarTextClassName: string = `${progressBarClassName}__text`;
const progressBarCompletedNumberClassName: string = `${progressBarClassName}__number-completed`;
const progressBarTotalNumberClassName: string = `${progressBarClassName}__number-total`;
const removeCheckedButtonClassName: string = 'js-remove-checked-button';

export const todoListAppClassNames = {
	todoListClassNames: {
		todoListClassName: todoListClassName,
		todoListTitleClassName: todoListTitleClassName,
		todoListToolBarClassName: todoListToolBarClassName
	},
	createTaskClassNames: {
		createTaskFormClassName: createTaskFormClassName,
		createTaskInputClassName: createTaskInputClassName,
		createTaskButtonClassName: createTaskButtonClassName
	},
	taskListClassName: taskListClassName,
	progressBarClassNames: {
		progressBarClassName: progressBarClassName,
		progressBarProgressClassName: progressBarProgressClassName,
		progressBarTextClassName: progressBarTextClassName,
		progressBarCompletedNumberClassName: progressBarCompletedNumberClassName,
		progressBarTotalNumberClassName: progressBarTotalNumberClassName
	},
	removeCheckedButtonClassName: removeCheckedButtonClassName
};

// task list
const taskLiClass: string = 'js-task';
const taskLiCheckedClass: string = `${taskLiClass}--checked`;
const taskCheckboxClass: string = `${taskLiClass}__checkbox`;
const taskInputClass: string = `${taskLiClass}__input`;
const taskInputCheckedClass: string = `${taskInputClass}--checked`;
const taskButtonClass: string = `${taskLiClass}__button`;
const taskButtonHighlightClass: string = `${taskButtonClass}--highlight`;
const taskEditButtonClass: string = `${taskButtonClass}--edit-button`;
const taskRemoveButtonClass: string = `${taskButtonClass}--remove-button`;

export const taskListClassNames = {
	taskLiClass: taskLiClass,
	taskLiCheckedClass: taskLiCheckedClass,
	taskCheckboxClass: taskCheckboxClass,
	taskInputClass: taskInputClass,
	taskInputCheckedClass: taskInputCheckedClass,
	taskButtonClass: taskButtonClass,
	taskButtonHighlightClass: taskButtonHighlightClass,
	taskEditButtonClass: taskEditButtonClass,
	taskRemoveButtonClass: taskRemoveButtonClass
};
