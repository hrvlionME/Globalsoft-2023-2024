import React, { useState } from 'react';
import validator from 'validator';
import eyeIcon from '../../assets/eye-icon.png';
import eyeSlashIcon from '../../assets/line-icon.png';
import loadingSpinner from '../../assets/spinner.gif';
import styles from './Login.module.css';
import loginImage from '../../assets/radionica.png';
import logo from '../../assets/globalsoft.png';
import Register from '../Register/Register.jsx';

const Login = ({
  setisLoggedIn,
  setIsRegisterOpen,
  isRegisterOpen,
  setUserId,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRegister = () => {
    setIsRegisterOpen(true);
  };

  const isEmailValid = (email) => {
    return validator.isEmail(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordIcon = () => {
    return showPassword ? eyeSlashIcon : eyeIcon;
  };

  const handleLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);

      if (!isEmailValid(email) || !isPasswordValid(password)) {
        setError('Invalid email or password format.');
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUserId(data.ID);
        setisLoggedIn(true);
      }
      if (response.status === 401) {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordMode(true);
    setError(null);
  };

  const handleReturnToLogin = () => {
    setIsRegisterOpen(false);
    setForgotPasswordMode(false);
    setError(null);
    setConfirmationMessage(false);
    setIsLoading(false);
  };

  const returnToLoginButton = (
    
    <button
      type="button"
      onClick={handleReturnToLogin}
      className={styles.forgotPasswordLink}
      onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
      onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
    >
      Login Here!
    </button>
  );

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const passwordInputRef = React.useRef();

  const handleEmailKeyPress = (event) => {
    if (event.key === 'Enter') {
      passwordInputRef.current.focus();
    }
  };

  const handleResetPassword = async () => {
    try {
      setError(null);
      setIsLoading(true);

      if (!isEmailValid(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      const response = await fetch('http://localhost:4000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setConfirmationMessage(
          'We have sent you an email \n with the reset instructions!'
        );
      } else {
        setError(
          data.message || 'Failed to initiate password reset. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error during password reset initiation:', error.message);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // const resetInputFields = () => {
  //   setEmail('');
  //   setPassword('');
  // };

  // React.useEffect(() => {
  //   if (error) {
  //     resetInputFields();
  //   }
  // }, [error]);

  return (
    <div className={styles.outside}>
      <div className={styles.loginContainer}>
        <div className={styles.loginImage}>
          <img src={loginImage} className={styles.slika} alt="Login" />
        </div>
        {forgotPasswordMode ? (
          <div className={styles.forgotPasswordContainer}>
            {confirmationMessage ? (
              <div className={styles.confirmationMessage}>
                {confirmationMessage}
                <br />
                {returnToLoginButton}
              </div>
            ) : (
              <>
                <h5 className={styles.resetPassTitle}>Reset Password:</h5>
                <form className={styles.form}>
                  <label className={styles.label} htmlFor="email">Your Email:</label>
                  <input
                    className={`${styles.input} ${!isEmailValid(email) ? styles['invalid-field'] : ''}`}
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                  />
                  {error && <div className={styles.errorMessage}>{error}</div>}
                  <button type="button" className={styles.button} onClick={handleResetPassword}>
                    <div className={styles.buttonContent}>
                      {isLoading ? (
                        <img className={styles.image} src={loadingSpinner} alt="Loading" />
                      ) : (
                        'Reset Password'
                      )}
                    </div>
                  </button>
                  <p className={styles.text}>
                    <i>
                      We will send you an email with the <br /> reset instructions.
                    </i>
                  </p>
                  {returnToLoginButton}
                </form>
              </>
            )}
          </div>
        ) : isRegisterOpen ? (
          <div className={styles.forgotPasswordContainer}>
            <Register setIsRegisterOpen={setIsRegisterOpen} />
            <p className={styles.text}>Already have an Account? {returnToLoginButton}</p>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <div className={styles.logoImage}>
              <img className={styles.image} src={logo} alt="logo" />
            </div>
            <h3 className={styles.loginTitle}>Login</h3>
            <form className={styles.form}>
              <label className={styles.label} htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleEmailKeyPress}
                className={`${styles.input} ${!isEmailValid(email) ? styles['invalid-field'] : ''}`}
              />

              <label className={styles.label} htmlFor="password">Password:</label>
              <div className={styles.inputContainer}>
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={handleKeyPress}
                  className={`${styles.input} ${!isPasswordValid(password) ? styles['invalid-field'] : ''}`}
                />
                <div
                  className={styles.inputIcon}
                  onClick={togglePasswordVisibility}
                >
                  <img className={styles.image}
                    src={getPasswordIcon()}
                    alt="Toggle Password Visibility"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className={styles.forgotPasswordLink}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = 'underline')
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Forgot your password?
              </button>

              {error && <div className={styles.errorMessage}>{error}</div>}
              <button type="button" className={styles.button} onClick={handleLogin}>
                <div className={styles.buttonContent}>
                  {isLoading ? (
                    <img className={styles.image} src={loadingSpinner} alt="Loading" />
                  ) : (
                    'Login'
                  )}
                </div>
              </button>

              <p className={styles.text}>
                Not registered yet?{' '}
                <button
                  type="button"
                  onClick={handleRegister}
                  className={styles.forgotPasswordLink}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecoration = 'underline')
                  }
                  onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                >
                  Create an Account!
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
