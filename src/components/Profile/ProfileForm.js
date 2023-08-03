
import { useRef,useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/AuthContext';

const ProfileForm = () => {

  const newpasswordInputref=useRef();
  const contextCtx=useContext(AuthContext)

  const submitHandler=event=>{
    event.preventDefault();
    const enteredNewPass=newpasswordInputref.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng',
    {
      method:'POST',
      body:JSON.stringify({
        idToken:contextCtx.token,
        password:enteredNewPass,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password'  minLength='7' ref={newpasswordInputref}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
