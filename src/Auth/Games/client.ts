import { FAILED_TO_LOGIN } from "@/app/constants/errorMessages";
import { showToast } from "@/app/notifier/toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// Function to refresh access token
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    if (!refreshToken) {
      window.location.href = "/login"; // Redirect to login if no refresh token
      showToast(FAILED_TO_LOGIN, "info");
    }

    try {
      const response = await api.post("/refreshtoken", {
        refresh_token: refreshToken,
      });

      const newAccessToken = response.data.access_token;
      Cookies.set("accessToken", newAccessToken, { expires: 1 / 24 }); // Example: 1 hour expiration

      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      window.location.href = "/login"; // Redirect to login on error
      throw new Error("Failed to refresh access token. Redirecting to login.");
    }
  }

  return accessToken;
};
api.interceptors.request.use(
  async (config: any) => {
    let accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      try {
        const token = await refreshAccessToken();
        if (!token || token === undefined) {
          
          throw new Error("Failed to obtain access token after refresh.");
        }
        accessToken = token;
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        throw error;
      }
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
