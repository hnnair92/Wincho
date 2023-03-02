import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Login.module.css'
import Banner from '../../assests/Wincha Image Asset.png'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../actions/user'
const Login = () => {
    // const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const{error,user,authenticated} = useSelector((state)=>state.userData)
    useEffect(()=>{
        if(authenticated){
            navigate("/")
        }
    },[navigate,authenticated])
    const [username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const dispatch = useDispatch()
    
    const handleLogin =(e)=>{
        const data = {
            username:username,
            password:password
        }
        e.preventDefault()
        dispatch(loginAction(data))
        
    }
    
  return (
    <div className={style.Container}>
        <div className={style.Login}>
            {/* <div className={style.Left}>
                <img src={Banner} alt="" />
            </div> */}
            <div className={style.Right}>
                <div className={style.TitleDiv}>
                    {/* <h1 className={style.Title}>Login with Email</h1> */}
                </div>
                <form action="" className={style.form} onSubmit={handleLogin}>
                    {error&&error.status==="False"?<p className={style.loginError}>invalid Crediantials</p>:""}
                    <div className={style.EmailInput}>
                        <label htmlFor="Username">Username</label>
                        <input type="text" name="" id="Username" value={username} className={style.email} placeholder="Your Username" onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                    </div>
                    <div className={style.PasswordInput}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="password" value={password} className={style.email} placeholder="Your password" onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                    <p className={style.ForgotPassword}>Forgot your Password?</p>
                    <div className={style.Btns}>
                        <button className={style.LoginBtn}>Login</button>
                        <Link to="/register"><button className={style.RegisterBtn}>Register</button></Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login