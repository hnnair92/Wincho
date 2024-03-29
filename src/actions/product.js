import {
  CONFIGURATION_FAILED,
  CONFIGURATION_REQUEST,
  CONFIGURATION_SUCCESS,
  GAME_ENTRY_FAILED,
  GAME_ENTRY_REQUEST,
  GAME_ENTRY_SUCCESS,
  GET_ALL_GAMES_FAIL,
  GET_ALL_GAMES_REQUEST,
  GET_ALL_GAMES_SUCCESS,
  GET_ALL_PRODUCT_BY_COLLECTION_FAILED,
  GET_ALL_PRODUCT_BY_COLLECTION_REQUEST,
  GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS,
} from "../constants/product";
// const baseUrl = "https://uat.wincha-online.com/"
import { baseUrl } from "../Components/url";
// const baseUrl = "https://uat.wincha-online.com"
const token = JSON.parse(localStorage.getItem("token"));

export const getProductByCollection = (request) => async (dispatch) => {
  console.log(request);
  try {
    dispatch({
      type: GET_ALL_PRODUCT_BY_COLLECTION_REQUEST,
    });
    await fetch(`${baseUrl}/product/collections`, {
      method: "POST",
      body: JSON.stringify({
        category_id: request.category_id,
        country_code: request.country_code,
        user_id: request.user_id,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: GET_ALL_PRODUCT_BY_COLLECTION_SUCCESS,
          payload: data.data,
        });
      });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_BY_COLLECTION_FAILED,
      payload: error,
    });
    console.log(error);
  }
};
export const getAllGames = (user) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_GAMES_REQUEST,
    });
    await fetch(`${baseUrl}/product/collections`, {
      method: "POST",
      body: JSON.stringify({
        category_id: "0",
        country_code: "UK",
        user_id: user,
        source: "web",
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_ALL_GAMES_SUCCESS,
          payload: data.data,
        });
      });
  } catch (error) {
    dispatch({
      type: GET_ALL_GAMES_FAIL,
      payload: error,
    });
  }
};
export const gameEntry = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({
      type: GAME_ENTRY_REQUEST,
    });
    await fetch(`${baseUrl}/game/entry`, {
      method: "POST",
      body: JSON.stringify({
        catalog: data.catalog,
        playerID: data.playerID,
        machineCode: data.machineCode,
        source: "web",
        replay: data.replay,
        freeplay: data.freeplay,
      }),
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: GAME_ENTRY_SUCCESS,
          payload: data.data[0],
        });
      });
  } catch (error) {
    dispatch({
      type: GAME_ENTRY_FAILED,
      payload: error,
    });
    console.log(error);
  }
};
export const configutation = () => async (dispatch) => {
  // console.log(countryCode);
  // let countryCode = ""
  const userId = JSON.parse(localStorage.getItem("user"));
  try {
    await fetch(`https://pro.ip-api.com/json/?key=cHngsdONXseEb0x`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        console.log(data);
        dispatch({
          type: CONFIGURATION_REQUEST,
        });
        fetch(`${baseUrl}/configurations/app`, {
          method: "POST",
          body: JSON.stringify({
            countrycode: data.countryCode,
            source: "web",
          }),
          headers: {
            "Content-Type": "application/json",
            "access-token": `${token}`,
          },
        })
          .then((res) => res.json())
          .then((datas) => {
            console.log(datas.data[0].COUNTRY_CODE);
            if (datas.data[0].COUNTRY_CODE === "GB") {
              datas.data[0].COUNTRY_CODE = "44";
              datas.data[0].COUNTRY_NAME = "UK";
              // console.log("changed ")
            }
            if (
              datas.data[0].COUNTRY_CODE === "US" ||
              datas.data[0].COUNTRY_CODE === "USA"
            ) {
              datas.data[0].COUNTRY_CODE = "1";
              datas.data[0].COUNTRY_NAME = "USA";

              // console.log("changed ")
            }

            localStorage.setItem("baseKey", datas.data[0].BASE_KEY);
            localStorage.setItem("baseIv", datas.data[0].BASE_IV);
            dispatch({
              type: CONFIGURATION_SUCCESS,
              payload: datas.data[0],
            });
          });
      });
  } catch (error) {
    dispatch({
      type: CONFIGURATION_FAILED,
      payload: error.message,
    });
  }
};
