import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import axios from 'axios';
import "./Form.css";
import UserChunk from "./UserChunk.js";

function linebreak(){
  return(
    <span>
      <br/>
    </span>
  );
}

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .test('email-taken', 'Email is taken', value => value !== "waffle@syrup.com")
      .required("Must include email address"),
    password: yup.string()
      // .when('$user', (user, passSchema) => user ? passSchema : passSchema.min(6, 'minimal password length is 6 characters'))
      // .when('$user', (user, passSchema) => user ? passSchema : passSchema.max(15, 'maximum password length is 15 characters')
      .matches(

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character`,
      )
      .required(),
    role: yup.string().required("Must choose a role"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
  });
  
  export default function Form() {
    // managing state for our form inputs
    const [formState, setFormState] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
      terms: false
    });
  
    // BONUS!: state for whether our button should be disabled or not.
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user, setUser] = useState([]);
    // Everytime formState changes, check to see if it passes verification.
    // If it does, then enable the submit button, otherwise disable
    useEffect(() => {
      formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
      });
    }, [formState]);

    // useEffect(() => {

    // }, [user]);
  
    const [errorState, setErrorState] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
      terms: ""
    });
  
    const validate = e => {
      let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
          setErrorState({
            ...errorState,
            [e.target.name]: ""
          });
        })
        .catch(err => {
          setErrorState({
            ...errorState,
            [e.target.name]: err.errors[0]
          });
        });
    };
  
    // onChange function
    const inputChange = e => {
      e.persist();
      // console.log("input changed!", e.target.value, e.target.checked);
      validate(e);
      let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormState({ ...formState, [e.target.name]: value });
    };
  
    const formSubmit = e => {
      e.preventDefault();
      console.log("form submitted!");
      axios
        .post("https://reqres.in/api/users", formState)
        .then(response => {
            setUser([...user, response.data]);
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: false
              });
        })
        .catch(err => console.log(err));
    };
  
    return (
    <div className="formContainer">
    <form onSubmit={formSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={inputChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={inputChange}
          />
          {errorState.email.length > 0 ? (
            <p className="error">{errorState.email}</p>
          ) : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            className="password"
            name="password"
            id="password"
            type='password'
            value={formState.password}
            onChange={inputChange}
          /> 
          {errorState.password.length > 0 ? (
            <p className="error">{errorState.password}</p>
          ) : null}
        </label>
        <label htmlFor="roles">
            What is your role?
            <select
            value={formState.role}
            name="role"
            id="roles"
            onChange={inputChange}
            >
            <option value="Blank"></option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
            </select>
            {errorState.role.length > 0 ? (
            <p className="error">{errorState.role}</p>
            ) : null}
        </label>
        <div>
        <label htmlFor="terms" className='terms'>
          <input
          className='checkbox'
            type="checkbox"
            id="terms"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
          />
          Terms & Conditions
          
        </label>
        {errorState.terms.length > 0 ? (
            <p className="error">{errorState.terms}</p>
          ) : null}
        </div>
        
        <button disabled={buttonDisabled}>Submit</button>
        
      </form>
      <UserChunk user={user} />
      
    </div>
      
    );
  }
  