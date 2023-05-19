import {
    CART_FAIL,
    CART_REQUEST,
    CART_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    NOTIFICATION_FAIL,
    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    PROFILE_FAIL,
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
  } from "../constants/user";
  import { configutation } from "./product";
  // const baseUrl = process.env.REACT_APP_BASEURL
  import { baseUrl } from "../Components/url";

//const baseUrl = "https://uat.wincha-online.com
  
  export const loginAction = (data) => async (disptach) => {
    console.log("reached", data);
    try {
      disptach({
        type: LOGIN_REQUEST,
      });
  
      await fetch(`${baseUrl}/user/account/login`, {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          source: "web",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "True") {
            // updateProfile(data.data.user_id)
            localStorage.setItem("user", JSON.stringify(data.data.user_id));
            // localStorage.setItem("user",JSON.stringify(data))
            const userData = {
              status: data.status,
              user: data.data,
            };
            disptach({
              type: LOGIN_SUCCESS,
              payload: data,
              // payload:userData
            });
          } else {
            // localStorage.removeItem("user")
            disptach({
              type: LOGIN_FAIL,
              payload: data,
            });
          }
        });
    } catch (error) {
      disptach({
        type: LOGIN_FAIL,
        payload: error.message,
      });
    }
  };
  
  export const registerAction = (data) => async (dispatch) => {
    console.log(data);
    const deviceId = JSON.parse(localStorage.getItem("userId"))
    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password,
      dob: data.dob,
      source: "web",
      phone: "",
      addressline1: "",
      addressline2: "",
      city: "",
      state: data.countryname==="USA"?data.state:"",
      zipcode: "",
      coutrycode: data.countrycode,
      coutryname: data.countryname,
      accountstatus: "",
      device_id: deviceId,
      user_type: data.user_type,
    }
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      await fetch(`${baseUrl}/user/account/signup`, {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data.user_id)
          console.log(data.data)
          console.log(data)
          console.log(registerData)
          if (data.status === "True") {
            console.log(data.data.user_id)
            // if(data.data.)
            // console.log(data)
            // localStorage.setItem("user",JSON.stringify(data))
            localStorage.setItem("user", JSON.stringify(data.data.user_id));
            localStorage.setItem("verfiedEmail",JSON.stringify(false))
            updateProfile(data.data.user_id);
            dispatch({
              type: REGISTER_SUCCESS,
              payload: data,
            });
          } else {
            // localStorage.removeItem("user")
            dispatch({
              type: REGISTER_FAIL,
              payload: data,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.message,
      });
    }
  };
  
  export const updateProfile = () => async (dispatch) => {
    try {
      dispatch({
        type: PROFILE_REQUEST,
      });
      const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
      await fetch(`${baseUrl}/user/profile/details`, {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
          source: "web",
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // localStorage.setItem("user",JSON.stringify(data.data[0]._id))
  
          dispatch({
            type: PROFILE_SUCCESS,
            payload: data,
          });
        });
    } catch (error) {
      // localStorage.removeItem("user")
  
      dispatch({
        type: PROFILE_FAIL,
        payload: error.message,
      });
    }
  };
  export const notificationAction = () => async (dispatch) => {
    try {
      dispatch({
        type: NOTIFICATION_REQUEST,
      });
      const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
      await fetch(`${baseUrl}/user/notifications/get`, {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: NOTIFICATION_SUCCESS,
            payload: data.data[0],
          });
        });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_FAIL,
        payload: error,
      });
    }
  };
  export const cartAction = () => async (dispatch) => {
    try {
      dispatch({
        type: CART_REQUEST,
      });
      // const userId = JSON.parse(localStorage.getItem("user"))||""
      const userId = localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user"))
      await fetch(`${baseUrl}/cart/collection`, {
        method: "POST",
        body: JSON.stringify({
          user_id: userId,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: CART_SUCCESS,
            payload: data.data,
          });
        });
    } catch (error) {
      dispatch({
        type: CART_FAIL,
        payload: error.message,
      });
    }
  };
  