import styles from './Register.module.css';
import FormInput from './FormInput';
import { useState } from 'react';

const Register = ({ setIsRegisterOpen }) => {
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const closeRegister = () => {
    setTimeout(() => {
      setIsRegisterOpen(false);
    }, 3000);
  };
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'firstName',
      type: 'text',
      placeholder: 'John',
      errorMessage: 'First Name should be 2-30 characters!',
      label: 'First Name:',
      pattern: '^[A-Za-z]{2,30}$',
      required: true,
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      placeholder: 'Doe',
      errorMessage: 'Last Name should be 2-30 characters!',
      label: 'Last Name:',
      pattern: '^[A-Za-z]{2,30}$',
      required: true,
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'example@gmail.com',
      errorMessage: 'It should be a valid email address!',
      label: 'Email:',
      pattern: '.*@.*',
      required: true,
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: '******',
      errorMessage: 'Password should be 6-20 characters!',
      label: 'Password:',
      pattern: '^[A-Za-z0-9]{6,20}$',
      required: true,
    },
    {
      id: 5,
      name: 'confirmPass',
      type: 'password',
      placeholder: '******',
      errorMessage: "Passwords didn't match!",
      label: 'Confirm password:',
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.firstName,
          lastname: values.lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmationMessage(
          'Successful registration... Redirecting to login...'
        );
      }
      if (response.status === 400) {
        setError('User with this email already exists!');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  const onChange = (e) => {
    setError(null);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles['Register']}>
      <form className={styles['register-form']} onSubmit={handleSubmit}>
        <h3 className={styles['title']}>Registration</h3>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {confirmationMessage && (
          <div className={styles['confirmation-message']}>
            {confirmationMessage}
            {closeRegister()}
          </div>
        )}
        {error && <div className={styles['error-message']}>{error}</div>}
        <button className={styles['register-button']}>Register</button>
      </form>
    </div>
  );
};

export default Register;
