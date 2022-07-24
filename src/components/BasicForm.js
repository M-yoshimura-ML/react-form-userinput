import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !enteredFirstNameIsValid ||
      !enteredLastNameIsValid ||
      !enteredEmailIsValid
    ) {
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClasses = firstNameInputHasError ? "form-control invalid" : "form-control";
  const lastNameInputClasses = firstNameInputHasError ? "form-control invalid" : "form-control";  
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            value={enteredFirstName}
          />
          {firstNameInputHasError && <p className="error-text">fist name is empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
          {lastNameInputHasError && <p className="error-text">fist name is empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">email is not valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
