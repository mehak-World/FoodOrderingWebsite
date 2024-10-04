import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../utils/UserSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const msg = useSelector((store) => store.user.logInMsg);
    const usernames = useSelector((store) => store.user.usernames);
    console.log(usernames);

    const handleUsernameChange = (e) => {
            setUsername(e.target.value);
    }

    const handleLogin = (e) => {
        dispatch(loginUser({username, password}))
        console.log(msg);
        console.log(usernames);
    }
  

  return (
    <div className = "w-1/2 m-auto flex-column  gap-3 justify-center align-center">
     <div className= "mb-4 text-2xl text-red-600 italic font-bold">
            {msg != '' && <span>{msg}</span>}
     </div>
     
        <label for = "username">
            Username: 
        </label>
        <input type = "text" placeholder = "Enter username" id = "username" value = {username} onChange = {handleUsernameChange} className = "w-96 border border-solid ml-4 p-2 rounder-lg"/>
<br />
<br />
        <label for = "password">
           Password: 
        </label>
   
        <input type = "password" placeholder = "Enter password" id = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} className = "w-96 border border-solid ml-4 p-2 rounder-lg" />
        <br />
        <br />
      <button className = "bg-red-500 p-2 rounded-lg text-white" onClick = {handleLogin}>Login</button>
      
    
    </div>
  )
}

export default Login
