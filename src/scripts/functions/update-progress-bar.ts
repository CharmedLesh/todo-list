import { ITask } from '../interfaces/interfaces';
import { elements } from '../constants/elements';

// function toupdate progress bar and progress counts
export function updateProgressBar(tasks: ITask[]): void {
	const totalTasksCount = tasks.length;
	const completedTasksCount = tasks.reduce((count, task) => count + (task.isCompleted ? 1 : 0), 0);

	if (elements.$totalTasksNumber) {
		elements.$totalTasksNumber.innerHTML = totalTasksCount.toString();
	}
	if (elements.$completedTasksNumber) {
		elements.$completedTasksNumber.innerHTML = completedTasksCount.toString();
	}

	const progress = (completedTasksCount / totalTasksCount) * 100;
	if (elements.$progressBar) {
		elements.$progressBar.style.width = progress ? `${progress}%` : '0';
	}
}
