import React, { useState } from 'react';
import validator from 'validator';
import eyeIcon from '../../assets/eye-icon.png';
import eyeSlashIcon from '../../assets/line-icon.png';
import loadingSpinner from '../../assets/spinner.gif';
import styles from './Login.module.css';
import loginImage from '../../assets/radionica.png';
import logo from '../../assets/globalsoft.png';
import Register from '../Register/Register.jsx';

const Login = ({ setisLoggedIn, setIsRegisterOpen, isRegisterOpen, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRegister = () => {
    setIsRegisterOpen(true);
  }

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
      } if (response.status === 401) {
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
    setIsRegisterOpen(false)
    setForgotPasswordMode(false);
    setError(null);
    setIsLoading(false);
  };

  const returnToLoginButton = (
    <button type="button"
    onClick={handleReturnToLogin}   
    className={styles['forgot-password-link']}
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
  
        // TREBA NAPRAVITI NA BACKENDU
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
        setConfirmationMessage('Password reset initiated.\nCheck your email for further instructions.');
      } else {
        setError(data.message || 'Failed to initiate password reset. Please try again.');
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
    <div className={styles['outside']}>
      <div className={styles['login-container']}>
        <div className={styles['login-image']}>
          <img src={loginImage} className={styles['slika']} alt="Login" />
        </div>
        {forgotPasswordMode ? (
          <div className={styles['forgot-password-container']}>
            {confirmationMessage && (
              <div className={styles['confirmation-message']}>{confirmationMessage}</div>
            )}
            <h5>Reset Password:</h5>
            <form>
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className={!isEmailValid(email) ? styles['invalid-field'] : ''}
              />
              {error && <div className={styles['error-message']}>{error}</div>}
              <button type="button" onClick={handleResetPassword}>
                <div className={styles['button-content']}>
                  {isLoading ? (
                    <img src={loadingSpinner} alt="Loading" />
                  ) : (
                    'Reset Password'
                  )}
                </div>
              </button>
              <p><i>We will send you an email with the  <br /> reset instructions.</i></p>
              {returnToLoginButton}
            </form>
          </div>
        ) : isRegisterOpen ? (
          <div className={styles['forgot-password-container']}>
            <Register setIsRegisterOpen={setIsRegisterOpen} />
            <p>Already have an Account? {returnToLoginButton}</p>
          </div>
        ) : (
          <div className={styles['form-container']}>
            <div className={styles['logo-image']}>
              <img src={logo} alt="logo" />
            </div>
            <h3>Login</h3>
            <form>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                onKeyDown={handleEmailKeyPress}
                className={!isEmailValid(email) ? styles['invalid-field'] : ''}
              />

              <label htmlFor="password">Password:</label>
              <div className={styles['input-container']}>
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
                  className={!isPasswordValid(password) ? styles['invalid-field'] : ''}
                />
                <div className={styles['input-icon']} onClick={togglePasswordVisibility}>
                  <img src={getPasswordIcon()} alt="Toggle Password Visibility" />
                </div>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className={styles['forgot-password-link']}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Forgot your password?
              </button>

              {error && <div className={styles['error-message']}>{error}</div>}
              <button type="button" onClick={handleLogin}>
                <div className={styles['button-content']}>
                  {isLoading ? (
                    <img src={loadingSpinner} alt="Loading" />
                  ) : (
                    'Login'
                  )}
                </div>
              </button>
              
              <p>
                Not registered yet?  <button
                type="button"
                onClick={handleRegister}
                className={styles['forgot-password-link']}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
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







