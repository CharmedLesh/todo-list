export class ClassName {
	static addToClassNameList(classNameOrClassNamesArray: string | string[], $element: HTMLElement): void {
		if (typeof classNameOrClassNamesArray === 'string') {
			$element.classList.add(classNameOrClassNamesArray);
		}
		if (Array.isArray(classNameOrClassNamesArray)) {
			for (const className of classNameOrClassNamesArray) {
				$element.classList.add(className);
			}
		}
	}

	static removeFromClassNameList(classNameOrClassNamesArray: string | string[], $element: HTMLElement): void {
		if (typeof classNameOrClassNamesArray === 'string') {
			$element.classList.remove(classNameOrClassNamesArray);
		}
		if (Array.isArray(classNameOrClassNamesArray)) {
			for (const className of classNameOrClassNamesArray) {
				$element.classList.remove(className);
			}
		}
	}

	static conditionalClassName(condition: boolean, $element: HTMLElement, className: string): void {
		if (condition) {
			$element.classList.add(className);
		} else {
			$element.classList.remove(className);
		}
	}
}
