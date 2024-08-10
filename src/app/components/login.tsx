import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { striveLogin } from "@/Auth/Login";
import { showToast } from "@/app/notifier/toast";
import Link from "next/link";
import { getGoogleAuthUrl } from "@/Auth/GoogleAuth";
import { INVALID_PASSWORD, INVALID_USERNAME, LOGIN_ERROR_MESSAGE , SERVER_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE } from "@/app/constants/errorMessages";
import Modal from "./Common/Modal";



const Login = ({ setLoader = (t: boolean) => {} }) => {
  // const [error, setError] = React.useState<string>("");
  const [googleLoginMessage, setGoogleLoginMessage] =
    React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);



{/*Handling normal login*/}
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.getElementById("login") as HTMLFormElement;
    let formData = new FormData(form);

    const credential = formData.get("credential") as string;
    const password = formData.get("password") as string;

    if (password.length < 8) {
      // setError("Password must be at least 8 characters");
      showToast(INVALID_PASSWORD, "info");
      return;
    }

    formData.delete("credential");
    if (credential.includes("@")) {
      formData.set("email", credential);
    } else if (credential.match(/^[0-9]+$/)) {
      formData.set("phone", credential);
    } else {
      if (credential.length <= 3) {
        // setError("Username must be greater than 3 characters");
        showToast(INVALID_USERNAME, "info");
        return;
      }
      formData.set("username", credential);
    }

    setLoader(true); // Set loading state to true

    try {
      const res = await striveLogin(formData);
      if (res.status_code === 200) {
        showToast("Login successful", "success");
        window.location.href = "/home";
      } else {
        // setError(res.message);
        showToast(res.message as string, "error");
        console.log(res.message);
        if (res.message == undefined) {
          showToast(SERVER_ERROR_MESSAGE, "info");
          return;
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast(LOGIN_ERROR_MESSAGE, "info"); 
    } finally {
      setLoader(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoader(true);
    console.log("google register");
    const res = await getGoogleAuthUrl();
    console.log(res);
    if (res.status_code !== 200) {
      if (res.message === undefined) {
        showToast(SERVER_ERROR_MESSAGE, "info");
        setLoader(false);
        return;
      }
      const msg = res.message;
      showToast(msg as string, "error");
      setLoader(false);
      return;
    } else {
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        showToast(UNKNOWN_ERROR_MESSAGE, "warn");
        setLoader(false);
      }
      // setLoader(false);
    }
    // window.location.href = url;
  };


  useEffect(() => {
    setLoader(false);
    return () => {
      setLoader(true);
    };
  }, []);


  return (
    <Modal title="Sign in" id="login_modal">
    <div className=" bg-[#11112B] rounded-2xl flex flex-col items-center justify-center p-4 m-auto w-80">
      <form
        className="w-full relative rounded"
        id="login"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Email/username
          </label>
          <input
            type="text"
            name="credential"
            placeholder="Enter email"
            required={true}
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required={true}
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
          />
        </div>
        <div className="flex items-end justify-end">
          <p className="mb-4 text-[#8E84A3] font-medium text-[0.9rem]">
            <a href="">Forget your password?</a>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#9562FF] border-[#A77CFF] text-white text-[1rem] font-medium w-full py-2 px-5 rounded-[0.625rem] focus:outline-none focus:shadow-outline"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>
        </div>
        <p className="text-[#3f3f6a] text-[0.8rem] font-medium py-2 w-fit m-auto">
          OR
        </p>
      </form>
      <div className="w-full flex items-center justify-between">
        <button
          onClick={handleGoogleLogin}
          className="border-2 border-solid border-[#3e3e6a] text-white font-medium text-[1rem] w-full py-2 px-4 rounded-[0.625rem]"
        >
          {loading ? "Please wait..." : "Continue with Google"}
        </button>
      </div>
      <p className="text-[#8E84A3] mt-4 w-fit m-auto text-[0.8rem] font-medium">
        New user?{" "}
        <span className="text-white border-b-2">
          <Link href="/register">Create an account</Link>
        </span>
      </p>
      {googleLoginMessage && (
        <p className="text-[#FFFFFF] mt-4 w-fit m-auto text-[0.8rem] font-medium">
          {googleLoginMessage}
        </p>
      )}
    </div>
    </Modal>
  );
};

export default Login;
