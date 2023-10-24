export function conditionalClassName(condition: boolean, $element: HTMLElement, className: string): void {
	if (condition) {
		$element.classList.add(className);
	} else {
		$element.classList.remove(className);
	}
}
