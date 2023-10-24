import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../interfaces/interfaces';
import { elements } from '../constants/elements';
import { createTask } from './create-task';

export function applySubmitNewEventListener(
	tasks: ITask[],
	pushNewTaskToArray: (newTask: ITask) => void,
	isEditing: boolean,
	setIsTaskCheckedToArray: (task: ITask, isCompleted: boolean) => void,
	removeTaskFromArray: (id: string) => void
) {
	elements.$submitNewTaskForm?.addEventListener('submit', e => {
		e.preventDefault();

		if (elements.$submitNewTaskInput?.value) {
			const newTask: ITask = {
				id: uuidv4(),
				title: elements.$submitNewTaskInput?.value,
				isCompleted: false
			};
			pushNewTaskToArray(newTask);

			createTask(tasks, newTask, isEditing, setIsTaskCheckedToArray, removeTaskFromArray);
			elements.$submitNewTaskInput.value = '';
		}
	});
}
