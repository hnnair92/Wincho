import React from 'react'
import style from './Footer.module.css'
import Logo from '../../assests/Wincha Bird Footer.png'
import {FaFacebook} from 'react-icons/fa'
import {AiFillTwitterCircle,AiOutlineInstagram} from 'react-icons/ai'
// import {} from 'react-icons/ai'
const Footer = () => {
  return (
    <div className={style.Container}>
        <div className={style.Footer}>
            <div className={style.Logo}>
                <img src={Logo} alt="" />
            </div>
            <div className={style.FooterDetails}>
            <div className={style.Menu}>
                <ul>
                <p className={style.Title}>LINKS</p>
                    <li>Home</li>
                    <li>About</li>
                    <li>Watch</li>
                    <li>Store</li>
                    <li>Support</li>
                </ul>
            </div>
            <div className={style.Address}>
                <p className={style.Title}>YOOHOO-- FOLLOW US</p>
                <div className={style.SocialMedia}>
                    <FaFacebook/>
                    <AiOutlineInstagram/>
                    <AiFillTwitterCircle/>

                </div>
                <div className={style.Copyright}>
                    <p>Wincha</p>
                    <p>&copy; Bandai Namco Amusement Europe Ltd.</p>
                </div>
                <div className={style.TermsAndPrivacy}>
                    <p>Privacy Policy</p>
                    <p>Terms and Conditions</p>
                </div>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Footer