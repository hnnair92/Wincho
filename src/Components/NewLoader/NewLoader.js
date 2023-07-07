import React from 'react'
import style from './NewLoader.module.css'
import { AllAnimation } from "../../Animation/allAnimation";
import Lottie from "lottie-react";

const NewLoader = () => {
  return (
    <div className={style.Container}>
    <div className={style.Loader}>
    <Lottie animationData={AllAnimation.Loader} />
    </div>
</div>
  )
}

export default NewLoader