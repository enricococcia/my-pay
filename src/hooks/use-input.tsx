import { useReducer } from "react";

enum InputActionTypes {
	INPUT = "INPUT",
	BLUR = "BLUR",
	ADD = "ADD",
	RESET = "RESET",
}

interface InputAction {
	type: InputActionTypes;
	value: string;
}

interface InputState {
	isTouched: boolean;
	value: string;
}

const inputStateReducer = (
	state: InputState,
	action: InputAction
): InputState => {
	switch (action.type) {
		case InputActionTypes.INPUT:
			return { isTouched: state.isTouched, value: action.value };
		case InputActionTypes.BLUR:
			return { isTouched: true, value: state.value };
		case InputActionTypes.ADD:
			return { isTouched: true, value: state.value + action.value };
		case InputActionTypes.RESET:
			return { isTouched: false, value: "" };
		default:
			throw new Error();
	}
};

const useInput = (validateValue: (val: string) => boolean, initialValue: string) => {
	let initialInputState: InputState = {
		value: "",
		isTouched: false,
	};

	if (initialValue.trim().length > 0) {
		initialInputState = {
			value: initialValue,
			isTouched: true,
		};
	}

	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initialInputState
	);

	const valueIsValid = validateValue(inputState.value);
	const hasError = !valueIsValid && inputState.isTouched;

	const valueChangeHandler = (event: any ) => {
		dispatch({ type: InputActionTypes.INPUT, value: event.target.value });
	};

	const inputBlurHandler = () => {
		dispatch({ type: InputActionTypes.BLUR, value: "" });
	};

	const valueAddHandler = (val: string) => {
		dispatch({ type: InputActionTypes.BLUR, value: val });
	};

	const reset = () => {
		dispatch({ type: InputActionTypes.RESET, value: "" });
	};

	return {
		value: inputState.value,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		valueAddHandler,
		reset,
	};
};

export default useInput;
