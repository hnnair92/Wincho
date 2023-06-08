import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./Cookie.module.css";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const Cookie = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const { configuration } = useSelector((state) => state.configuration);

  useEffect(() => {
    const consentCookie = localStorage.getItem("cookie_consent");
    if (consentCookie !== "true") {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowCookieBanner(false);
  };

  if (!showCookieBanner) {
    return null;
  }

  return (
    <div>
      <div className={style.first_container}>
        <div className={style.second_container}>
          {/* <div className={style.cooki_page}> */}
          <div className={style.cooki}>
            <div className={style.cooki_left}>
              <p>
                By using this site you agree to our{" "}
                <Link
                  onClick={() => {
                    window.open(`${configuration.privacy}`, "_blank");
                  }}
                >
                  cookie{" "}
                </Link>{" "}
                policy
              </p>
            </div>
            <div className={style.cooki_right}>
              <div className={style.coocki_button}>
                <button onClick={handleAccept}>OKAY</button>

                {/* <div className={style.cooki_icon}> */}
                <TiTick />
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cookie;
