import { ITask } from '../interfaces/interfaces';
import { saveTasksToLocalStorage } from './tasks-local-storage';
import { elements } from '../constants/elements';

export function applyRemoveAllCheckedEventListener(tasks: ITask[], removeAllCheckedTasksFromArray: () => void) {
	elements.$removeAllCheckedTasksButton?.addEventListener('click', () => {
		if (tasks) {
			removeAllCheckedTasksFromArray();
			saveTasksToLocalStorage(tasks);

			const tasksCollection = elements.$taskList?.children;
			if (tasksCollection) {
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
	});
}
