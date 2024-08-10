import axios from "axios";
import Cookies from "js-cookie";
import { api } from "./client";
import { createUserSession } from "./UserSession";
import { token, userData } from "./interfaces";



export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/api/login", { email, password });
    // Store the access token in cookies with an expiration time
    const expirationTime = 3600 * 1000;
    const expireDate = new Date(Date.now() + expirationTime);
    Cookies.set("Access_Token", response.data.token, { expires: expireDate });

    setTimeout(() => {
      Cookies.remove("Access_Token");
    }, expirationTime);

    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};



export const striveLogin = async (formData: FormData) => {
  return api
    .post("/api/v1/auth/login", formData)
    .then((response) => {
      console.log("fetch successful");
      if(response.status === 200) {
        console.log(response.data.data.userData)
        // convert response to correct data format
        const userData: userData = response.data.data.userData;
        const token: token = {
          access_token: response.data.data.access_token,
          refresh_token: response.data.data.refresh_token,
        };
        console.log(userData, token);
        createUserSession(userData, token);
      }

      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};


export const changePasswordAPI = async (formData: any) => {
  console.log("formdata", formData.get("username"));
  return api
    .post("/api/v1/auth/changePassword", formData)
    .then((response) => {
      console.log("fetch successful");
      
        
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  // const res = await api.post("/api/v1/auth/changePassword", formData);
  // console.log("hitted");
  // return res;
};


