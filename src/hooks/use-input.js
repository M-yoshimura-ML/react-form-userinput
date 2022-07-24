import { useState, useReducer } from "react";

const initialInputState = {
  value:'',
  isTouch: ''
};

const inputStateReducer = (state, action) => {
  if(action.type ==='INPUT') {
    return {value: action.value, isTouch:state.isTouch }
  }
  if(action.type ==='BLUR') {
    return {value: state.value, isTouch: true }
  }
  if(action.type ==='RESET') {
    return {value: '', isTouch: false}
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouch, setIsTouch] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouch;
  
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
  
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouch;

  const valueChangeHandler = (event) => {
    dispatch({type: 'INPUT', value: event.target.value});
    // setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    dispatch({type: 'BLUR'});
    // setIsTouch(true);
  };

  const reset = () => {
    dispatch({type: 'RESET'});
    // setEnteredValue('');
    // setIsTouch(false);
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
