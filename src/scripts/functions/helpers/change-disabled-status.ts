export function changeDisabledStatusForAllButtonsExceptSpecificOne(isDisabled: boolean, $exception: HTMLButtonElement) {
	const allButtons = document.querySelectorAll('button');
	for (let i = 0; i < allButtons.length; i++) {
		if (allButtons[i] !== $exception) {
			allButtons[i].disabled = isDisabled;
		}
	}
}

export function changeDisabledStatusForAllCheckboxes(isDisabled: boolean) {
	const allCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
	for (let i = 0; i < allCheckboxes.length; i++) {
		allCheckboxes[i].disabled = isDisabled;
	}
}
