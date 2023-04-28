import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { updateProfile } from '../../actions/user';
import { baseUrl } from "../url";
const Success = () => {
// const baseUrl = "https://uat.wincha-online.com"
const userId = JSON.parse(localStorage.getItem("user"));
const {configuration}= useSelector((state)=>state.configuration)
    const {search} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const checkoutId = search.split("=")
    const sessionId = checkoutId[checkoutId.length-1]
    useEffect(()=>{
        if(search===""){
            navigate("/tickets")
            // window.location.reload()
        }
    })
    async function addVip(){
      await fetch(`${baseUrl}/user/membership/add`,{
        method:"PUT",
        body:JSON.stringify({
          "user_id":userId,
          "vip": true,
          "source":"web",
          "amount":configuration.VIP_SUBSCRIPTION,
          "gateway":"stripe"
          }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then((data)=>{
        // const paymentSuccess = data.data[data.data.length-1].status
        // const product = data.data[data.data.length-1].product
        // if(paymentSuccess==="succeeded"){
        //     addPoint(data.data[data.data.length-1].product)
        // }
        // if(product==="Vip"){
        //   addVip()
        // addPoint("500")
        // }

        console.log(data.data[data.data.length-1].status)
        console.log(data)

    })
    }
    async function checkoutStripe(){
      // const splitData = id.split("?")
    //   console.log(search)
    //   console.log(checkoutId[checkoutId.length-1])
    await fetch("https://uat.wincha-online.com/points/check/stripe/status",{
        method:"POST",
        body:JSON.stringify({
            "id":sessionId
        }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then((data)=>{
        const paymentSuccess = data.data[data.data.length-1].status
        if(paymentSuccess==="succeeded"||paymentSuccess==="complete"){
            addPoint(data.data[data.data.length-1].product)
        }
        const product = data.data[data.data.length-1].product
         if(product==="Vip"){
          addVip()
        }
        console.log(data.data[data.data.length-1].status)
        console.log(data)

    })
    }
    async function addPoint(point){
      const poointBody = {
        user_id: userId,
        point: point,
        credicts: "true",
        source: "web",
      }
        await fetch(`${baseUrl}/points/update`, {
            method: "PUT",
            body: JSON.stringify(poointBody),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              console.log(poointBody)
              dispatch(updateProfile())
              navigate("/tickets")
            });
    }
    useEffect(()=>{
      checkoutStripe()
    },[])
  return (
    <div>success</div>
  )
}

export default Success