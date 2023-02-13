import React from 'react'
import { Link } from 'react-router-dom'
import style from './Login.module.css'
import Banner from '../../assests/Wincha Image Asset.png'
const Login = () => {
  return (
    <div className={style.Container}>
        <div className={style.Login}>
            <div className={style.Left}>
                <img src={Banner} alt="" />
            </div>
            <div className={style.Right}>
                <div className={style.TitleDiv}>
                    <h1 className={style.Title}>Login with Email</h1>
                </div>
                <form action="" className={style.form}>
                    <div className={style.EmailInput}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="" id="email" className={style.email} placeholder="Your email"/>
                    </div>
                    <div className={style.PasswordInput}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="password" className={style.email} placeholder="Your password"/>
                    </div>
                    <p className={style.ForgotPassword}>Forgot your Password?</p>
                    <div className={style.Btns}>
                        <button className={style.LoginBtn}>Login</button>
                        <Link to="/register"><button className={style.RegisterBtn}>Register</button></Link>
                    </div>
                </form>
                {/* <Link to="/register"><button className={style.RegisterBtn}>Register</button></Link> */}
            </div>
        </div>
    </div>
  )
}

export default Login