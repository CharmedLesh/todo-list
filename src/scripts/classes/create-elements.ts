import { addToClassNameList } from '../helpers/add-to-class-name-list';

export class CreateElements {
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
		value?: string,
		isDisabled?: boolean
	): HTMLInputElement {
		const $input = document.createElement('input');
		$input.spellcheck = false;
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $input);
		}
		if (value) {
			$input.value = value;
		}
		if (isDisabled) {
			$input.disabled = isDisabled;
		}
		return $input;
	}

	static createButton(
		classNameOrClassNamesArray?: string | string[],
		innerText?: string,
		innerIcon?: string
	): HTMLButtonElement {
		const $button = document.createElement('button');
		if (classNameOrClassNamesArray) {
			addToClassNameList(classNameOrClassNamesArray, $button);
		}
		if (innerText) {
			$button.innerHTML = innerText;
		}
		if (innerIcon) {
			$button.innerHTML = innerIcon;
		}
		return $button;
	}
}
