
import { createUserSession } from "./UserSession";
import { api } from "./client";
import { token, userData } from "./interfaces";

export const handleSendOtp = async (phoneNumber: string) => {
  // Send OTP to the server
  const res = api
    .post("/api/send-otp", { phoneNumber })
    .then((response) => {})
    .catch((error) => {
      console.error("Failed to send OTP:", error);
    });
};

export const handleVerifyOtp = async (formData: any) => {
  // Verify OTP with the server

  // return api.post("/api/verify-otp", formData);

  return api
    .post("/api/v1/auth/otp", formData)
    .then((response) => {
      console.log("OTP verification successful");
      if(response.status === 200) {
        console.log(response.data.data)
        // convert response to correct data format
        const userData: userData ={
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
      }
      return response.data;
    })
    .catch((error) => {
      console.error("OTP verification failed:", error);
      console.log("OTP verification failed, wait for some time and try again");
      return error.response.data;
    });
};




export const registerUser = async (formData: any) => {
  // Register the user
  return api
    .put("/api/v1/auth/user", formData)
    .then((response) => {
      

      return response.data;
    })
    .catch((error) => {
      console.error("Failed to register user:", error);
      console.log(
        "error to register user through api, wait for some time and try again"
      );
      return error.response.data;
    });
};

