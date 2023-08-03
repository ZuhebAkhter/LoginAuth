import { useState, useRef, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import classes from './AuthForm.module.css';
import AuthContext from '../../store/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading,setloading]=useState(false)
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
 const navigate=useNavigate();
  const authCtx=useContext(AuthContext);
 

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  // const submitHndler=(event)=>{
  //   event.preventDefault();
  //   const enteredemail=emailInputref.current.value;
  //   const enteredPassword=passwordInputref.current.value;
  //   if(isLogin){
    
  //   }else{
  //     fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng',{
  //       method:'POST',
  //       body:JSON.stringify({
  //         email:enteredemail,
  //         password:enteredPassword,
  //         returnSecureToken:true,
  //       }),
  //       headers:{
  //         'Content-Type':'application/json'
  //       }
  //     }).then(res=>{
  //       if(res.ok){
  // //..
  //       }else{
  //         return res.json().then(data=>{
  //           console.log(data)
  //         })
  //       }
  //     })
  //   }
  // }


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setloading(true)
  let url;

    if (isLogin) {
     url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng';

    } else {
      
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng';
      }
        fetch(
          url,
          {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        setloading(false)

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage='Email Exists';
            if(data && data.error && data.error.message){
              errormessage=data.error.message;
            }
            throw new Error(errormessage)
          
          });
        }
      }).then((data)=>{
        authCtx.login(data.idToken)
        navigate('/')
      })
      .catch((err)=>{
        alert(err.message)

      })
    
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email'  id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>

          {!loading && <button >{isLogin ? 'Login':'Create Account'}</button>}
          {loading && <p>Sending Requests</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
