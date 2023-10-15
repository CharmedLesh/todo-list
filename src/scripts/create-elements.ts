export class CreateElements {
	static createLi(className?: string): HTMLLIElement {
		const $li = document.createElement('li');
		if (className) {
			$li.classList.add(className);
		}
		return $li;
	}

	static createCheckbox(className?: string, isChecked?: boolean): HTMLInputElement {
		const $checkbox = document.createElement('input');
		$checkbox.type = 'checkbox';
		if (isChecked) {
			$checkbox.checked = isChecked;
		}
		if (className) {
			$checkbox.classList.add(className);
		}
		return $checkbox;
	}

	static createInput(className?: string, value?: string, isDisabled?: boolean): HTMLInputElement {
		const $input = document.createElement('input');
		$input.spellcheck = false;
		if (className) {
			$input.classList.add(className);
		}
		if (value) {
			$input.value = value;
		}
		if (isDisabled) {
			$input.disabled = isDisabled;
		}
		return $input;
	}

	static createButton(className?: string, innerText?: string, innerIcon?: string): HTMLButtonElement {
		const $button = document.createElement('button');
		if (className) {
			$button.classList.add(className);
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
