import { Logger } from './logger';

export class LocalStorage<T> {
	private readonly key: string;

	constructor({ key }: { key: string }) {
		this.key = key;
	}

	set(data: T): void {
		try {
			localStorage.setItem(this.key, JSON.stringify(data));
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
		}
	}

	get(): T | null {
		try {
			const data = localStorage.getItem(this.key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			if (error instanceof Error) {
				Logger.logError(error.message);
			}
			return null;
		}
	}
}
