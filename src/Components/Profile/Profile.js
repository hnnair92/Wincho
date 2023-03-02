import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profile from "../../assests/Wincha Profile Icon.png";
import style from "./Profile.module.css";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscription, setSubscription] = useState("");
  const [birthday, setBirthday] = useState("");
  const [shipping, setShipping] = useState(false);
  const { user } = useSelector((state) => state.userData);
  useEffect(() => {
    if (user) {
      const date = user.dob.split("-");
      // console.log(date)
      setUsername(user.username);
      setEmail(user.email);
      // setPassword()
      // setBirthday(`${date[2]}-${date[1]}-${date[0]}`)
      setBirthday(user.dob);
      // console.log(birthday)
      setSubscription(user.vip ? "Yes" : "No");
    }
  });
  return (
    <div className={style.Container}>
      <div className={style.Profile}>
        <div className={style.ProfileContent}>
          <div className={style.ProfileImage}>
            <img src={profile} alt="" />
          </div>
          <div className={style.ProfileAction}>
            <button className={style.ProfileBtn}>PROFILE</button>
            <button className={style.history}>HISTORY</button>
            <button className={style.Faq}>FAQ</button>
            <button className={style.Deactivate}>DEACTIVATE ACCOUNT</button>
          </div>
        </div>
        <div className={style.FullDetails}>
          <div className={style.TabBtns}>
            <button
              className={shipping ? style.TabBtb : style.TabBtnActive}
              onClick={() => {
                setShipping(false);
              }}
            >
              MY DETAILS
            </button>
            <button
              className={shipping ? style.TabBtnActive : style.TabBtb}
              onClick={() => {
                setShipping(true);
              }}
            >
              SHIPPING
            </button>
          </div>

          
          <div className={style.TabSection}>

          
            {shipping ? 
            <div className={style.Shipping}>
                <div className={style.Phone}>
                  <div className={style.title}>
                    <p>Phone Number</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="text" value={user.phone} />
                  </div>
                </div>
                <div className={style.Address}>
                  <div className={style.title}>
                    <p>Shipping</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="text" value={user.username||""} readOnly/>
                    <input type="text" value={user.addressline1||""}readOnly/>
                    <input type="text"  value={user.addressline2||""}readOnly/>
                    <input type="text"  value={user.city||""}readOnly/>
                    <input type="text"  value={user.county||""}readOnly/>
                    <input type="text" value={user.zipcode||""}readOnly/>
                  </div>
                </div>
              </div>
              : 
              <div className={style.myDetails}>
                <div className={style.Username}>
                  <div className={style.title}>
                    <p>Username</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="text" value={username} readOnly/>
                  </div>
                </div>
                <div className={style.Birthday}>
                  <div className={style.title}>
                    <p>Birthday</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="text" value={birthday} readOnly/>
                    {/* <input type="date" value={birthday} onChange/> */}
                  </div>
                </div>
                <div className={style.EmailAddress}>
                  <div className={style.title}>
                    <p>Email Address</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="email" value={email} readOnly/>
                    {/* <input type="email" value={email} onChange={(e)=>{
                                setEmail(e.target.value)
                            }}/> */}
                  </div>
                </div>
                <div className={style.Password}>
                  <div className={style.title}>
                    <p>Password</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="password" value={password} readOnly/>
                    {/* <input type="password" value={password} onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/> */}
                  </div>
                </div>
                <div className={style.Subscription}>
                  <div className={style.title}>
                    <p>Subscription</p>
                  </div>
                  <div className={style.InputSection}>
                    <input type="text" value={subscription} readOnly/>
                    {/* <input type="text" value={subscription} onChange={(e)=>{
                                setSubscription(e.target.value)
                            }}/> */}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
