export const conditionalClassName = (condition: boolean, $element: HTMLElement, className: string) => {
	if (condition) {
		$element.classList.add(className);
	} else {
		$element.classList.remove(className);
	}
};
