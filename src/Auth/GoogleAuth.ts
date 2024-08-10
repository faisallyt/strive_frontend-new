import { api } from "./client";
import Cookies from "js-cookie";
import { token, userData } from "./interfaces";
import { createUserSession } from "./UserSession";

export const handleOAuthCallback = async (code: string) => {
  if (code) {
    try {
      //   Sends the code URL query to the backend server
      const response = await api.put("/api/v1/auth/exchange?code=" + code);

      // console.log(response.data);

      // Extract tokens from the response
      if (response.status === 200) {
        const userData: userData = {
          email: response.data.data.email,
          username: response.data.data.username,
          phone: response.data.data.phone,
          dob: response.data.data.dob,
        }
        const token: token = {
          access_token: response.data.data.access_token,
          refresh_token: response.data.data.refresh_token,
        };
        console.log(userData, token);
        createUserSession(userData, token);
        return response.data;
      }
      // Redirect to the user data form page
      return true;
    } catch (error) {
      console.error("Error exchanging code:", error);
      return false;
      // display error message to users
    }
  }
};




export const getGoogleAuthUrl = async () => {
  try {
    const response = await api.get("/api/v1/auth/GoogleAuthUrl");
    //Redirecting the user to the Google
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Google OAuth URL:", error);
    return error.response?.data;
  }
};
