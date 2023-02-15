import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './Register.module.css'
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { registerAction } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const navigate = useNavigate()
    const{error,user,authenticated} = useSelector((state)=>state.userData)
    useEffect(()=>{
        if(authenticated){
            navigate("/")
        }
    },[navigate,authenticated])
    const baseUrl = "https://uat.wincha-online.com"
    const[terms,setTerms] = useState(false)
    const[passwordType,setPasswordType] = useState("password")
    // const[showPassword,setShowPassword] = useState(false)
    const [email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[confirmPassword,setConfirmPassword] = useState("")
    const[username,setUsername] = useState("")
    const[usernameExist,setUsernameExist] = useState('')
    const[eligible,setEligible] = useState(true)
    const[date,setDate] = useState("")
    const dispatch = useDispatch()
    const handleRegister=(e)=>{
        e.preventDefault()
        console.log("reached");
        checkUsername()
        console.log("register username state",usernameExist)
        const data = {
            username:username,
            email:email,
            password:password,
            dob:date
        }
        if(eligible===true&&password===confirmPassword){
            dispatch(registerAction(data))
        }
    }
    const checkUsername = async()=>{
        console.log(usernameExist.length)
        fetch(`${baseUrl}/user/username/check`,{
            method:"POST",
            body:JSON.stringify({
                username:username,
            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            console.log(data);
            setUsernameExist(data.status)
        })
    }
    let dateArray = []
    const handleDate = (e)=>{
        const selDate = e.target.value;
        dateArray = selDate.split("-");
        const CurYear = new Date().getFullYear()
        console.log(dateArray);
        if(dateArray[0]<=CurYear-12){
            setEligible(true)
        }
        else{
            setEligible(false)
        }
        setDate(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`)
    }
  return (
    <div className={style.Container}>
        <div className={style.Register}>
            <h1 className={style.Title}>Register to Start Playing!</h1>
            <form className={style.form} onSubmit={handleRegister}>
                <input type="text" placeholder='username' required className={style.input} value={username} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                {/* <div className={style.checkUser}>{usernameExist.length>0&&usernameExist==="True"?"":usernameExist.length>0&&usernameExist==="False"?<p className={style.userInvaild}>{error&&error.description}</p>:""}</div> */}
                <div className={style.password}>
                    <input type={passwordType} required placeholder='password' value={password} className={style.input} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                    {passwordType==="text"?<AiFillEyeInvisible className={style.eyeIcon} onClick={()=>{
                        
                        setPasswordType("password")
                    }}/>:<AiFillEye className={style.eyeIcon} onClick={()=>{
                        setPasswordType("text")
                    }}/>}

                </div>
               
                <div className={style.password}>
                    <input type="password" required placeholder='repeat password' className={style.input} onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }}/>
                   
                    {/* {passwordType==="text"?<AiFillEyeInvisible className={style.eyeIcon} onClick={()=>{
                        setPasswordType("password")
                    }}/>:<AiFillEye className={style.eyeIcon} onClick={()=>{
                        setPasswordType("text")
                    }}/>} */}
                </div>
                <div className={style.CheckPassword}>
                    {password===confirmPassword?"":<p className={style.passInvalid}>password is not matching</p>}
                </div>
                <input type="email" required placeholder='email' value={email} className={style.input} onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input type="date" placeholder='DOB' required name="" id=""  className={style.DataInput} onChange={(e)=>{
                   handleDate(e)
                }}/>
                {eligible?"":<p className={style.AgeRestrict}>Age below 12 is not allowed</p>}
                <div className={style.Terms}>
                    <input type="checkbox" name="" id="" onChange={(e)=>{
                        setTerms(e.target.checked)
                    }}/>
                    <p>I have read and agree to the <Link>Terms of Use</Link> and <Link>Privacy Policy</Link>.</p>
                </div>
                {/* <button type="submit" className={style.formBtn}>Confirm</button> */}
                {eligible&&terms===true&&password===confirmPassword?<button type="submit" className={style.formBtn} >Confirm</button>:<button type="submit" className={style.btnDisabled} disabled>Confirm</button>}
                
                <div className={style.checkUser}>{error&&error.status==="False"?<p className={style.userInvaild}>{error&&error.description}</p>:""}</div>
                {/* <div className={style.checkUser}>{usernameExist.length>0&&usernameExist==="True"?"":usernameExist.length>0&&usernameExist==="False"?<p className={style.userInvaild}>{error&&error.description}</p>:""}</div> */}
                
            </form>
        </div>
    </div>
    
  )
}

export default Register