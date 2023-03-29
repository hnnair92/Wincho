import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, PROFILE_FAIL, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS} from '../constants/user'
const baseUrl = "https://uat.wincha-online.com"

export const loginAction=(data)=>async(disptach)=>{
    console.log("reached",data)
    try {
        disptach({
            type:LOGIN_REQUEST
        })
        
        await fetch(`${baseUrl}/user/account/login`,{
            method:"POST",
            body:JSON.stringify({
                username:data.username,
                password:data.password,
                source:"web"

            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            if(data.status==="True"){
                // updateProfile(data.data.user_id)
                localStorage.setItem("user",JSON.stringify(data.data.user_id))
                // localStorage.setItem("user",JSON.stringify(data))
                const userData = {
                    status:data.status,
                    user:data.data
                }
                disptach({
                type:LOGIN_SUCCESS,
                payload:data
                // payload:userData
            })
            }
            else{
                // localStorage.removeItem("user")
                disptach({
                    type:LOGIN_FAIL,
                    payload:data
                })
            }
            
            
        })
    } catch (error) {
        disptach({
            type:LOGIN_FAIL,
            payload:error.message
        })
    }
    
}

export const registerAction = (data)=>async(dispatch)=>{
    console.log(data)
    try {
        dispatch({
            type:REGISTER_REQUEST
        })
        await fetch(`${baseUrl}/user/account/signup`,{
            method:"POST",
            body:JSON.stringify({
                username:data.username,
                email:data.email,
                password:data.password,
                dob:data.dob,
                source:"web"

            }),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
            if(data.status==="True"){
                // localStorage.setItem("user",JSON.stringify(data))
                localStorage.setItem("user",JSON.stringify(data.data[0]._id))
                updateProfile(data.data.user_id)
                dispatch({
                    type:REGISTER_SUCCESS,
                    payload:data
                })
            }
            else{
                // localStorage.removeItem("user")
                dispatch({
                    type:REGISTER_FAIL,
                    payload:data
                })
            }
            
        })
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error
        })
    }
}

export const updateProfile = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:PROFILE_REQUEST
        })
        const userId = JSON.parse(localStorage.getItem("user"))
        await fetch(`${baseUrl}/user/profile/details`,{
            method:"POST",
            body:JSON.stringify({
                user_id:userId,
                source:"web"
            }),
            headers:{
                "Content-type":"application/json"
            }
        }).then(res=>res.json()).then((data)=>{
                // localStorage.setItem("user",JSON.stringify(data.data[0]._id))

                dispatch({
                    type:PROFILE_SUCCESS,
                    payload:data
                })
            })
        
    } catch (error) {
                // localStorage.removeItem("user")

        dispatch({
            type:PROFILE_FAIL,
            payload:error.message
        })
    }
}