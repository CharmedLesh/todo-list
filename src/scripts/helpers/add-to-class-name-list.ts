export const addToClassNameList = (classNameOrClassNamesArray: string | string[], $element: HTMLElement): void => {
	if (typeof classNameOrClassNamesArray === 'string') {
		$element.classList.add(classNameOrClassNamesArray);
	}
	if (Array.isArray(classNameOrClassNamesArray)) {
		for (const className of classNameOrClassNamesArray) {
			$element.classList.add(className);
		}
	}
};
