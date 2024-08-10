import Cookies from "js-cookie";
import { token, userData } from "./interfaces";


export const createUserSession = (userData: userData, token:token) => {
    //storing the user data in the local storage
    localStorage.setItem("userData", JSON.stringify(userData));

    //storing the access token and the refresh token in the cookies and setting the expiration timeouts
    const accessTokenExpirationTime = 3600; // 1 hour in seconds
    Cookies.set("accessToken", token.access_token, {
        expires: new Date(Date.now() + accessTokenExpirationTime * 1000),
    });

  // Store refresh token in cookies with longer expiration time
    const refreshTokenExpirationTime = 7 * 24 * 3600; // 7 days in seconds
    Cookies.set("refreshToken", token.refresh_token, {
        expires: new Date(Date.now() + refreshTokenExpirationTime * 1000),
    });
    return true;
}

export const getUserSession = () => {
    if (typeof window === "undefined") {
        return {
            userData: null,
            refreshToken: null,
        };
    }
    const userData = localStorage.getItem("userData");
    const refreshToken = Cookies.get("refreshToken");
    return {
        userData: userData ? JSON.parse(userData) : null,
        refreshToken,
    };
    
}


export const deleteUserSession = () =>{
    localStorage.removeItem("userData");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    
    
    return true;
}