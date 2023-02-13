import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Register.module.css'
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";

const Register = () => {
    const[terms,setTerms] = useState(false)
    const[passwordType,setPasswordType] = useState("password")
    const[showPassword,setShowPassword] = useState(false)
  return (
    <div className={style.Container}>
        <div className={style.Register}>
            <h1 className={style.Title}>Register to Start Playing!</h1>
            <form action="" className={style.form}>
                <input type="text" placeholder='username' className={style.input}/>
                <div className={style.password}>
                    <input type={passwordType} placeholder='password' className={style.input}/>
                    {passwordType==="text"?<AiFillEyeInvisible className={style.eyeIcon} onClick={()=>{

                        setPasswordType("password")
                    }}/>:<AiFillEye className={style.eyeIcon} onClick={()=>{
                        setPasswordType("text")
                    }}/>}

                </div>
                <div className={style.password}>
                    <input type="password" placeholder='repeat password' className={style.input}/>
                    {/* {passwordType==="text"?<AiFillEyeInvisible className={style.eyeIcon} onClick={()=>{
                        setPasswordType("password")
                    }}/>:<AiFillEye className={style.eyeIcon} onClick={()=>{
                        setPasswordType("text")
                    }}/>} */}
                </div>
                <input type="email" placeholder='email' className={style.input}/>
                <div className={style.Terms}>
                    <input type="checkbox" name="" id="" onChange={(e)=>{
                        setTerms(e.target.checked)
                    }}/>
                    <p>I have read and agree to the <Link>Terms of Use</Link> and <Link>Privacy Policy</Link>.</p>
                </div>
                <button type="submit" className={terms?style.formBtn:style.btnDisabled} disabled={!terms}>Confirm</button>
            </form>
        </div>
    </div>
    
  )
}

export default Register