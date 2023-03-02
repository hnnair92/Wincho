import React, { useEffect, useState } from 'react'

const Demo = () => {
    const[id,setId] = useState("")
    const data ={
        id:"",
        name:"",
        email:"",
        subscription:"",
        password:""
    }
    useEffect(()=>{
        setId(data.id)
    },[])
  return (
    <div>
        <input type="text" value={id} />
    </div>
  )
}

export default Demo