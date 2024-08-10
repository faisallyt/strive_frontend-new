import React, { useState, FormEvent, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { handleSendOtp, handleVerifyOtp, registerUser } from "@/Auth/Register";
import { showToast } from "@/app/notifier/toast";
import { getGoogleAuthUrl } from "@/Auth/GoogleAuth";
import { INVALID_DATE, INVALID_DOB, INVALID_MONTH, OTP_VERIFICATION_ERROR, SERVER_ERROR_MESSAGE, UNKNOWN_ERROR_MESSAGE, USER_UNDER_AGE } from "@/app/constants/errorMessages";
import Modal from "./Common/Modal";

const Register = ({ setLoader = (t: boolean) => {} }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [pop, setPop] = useState(true);


  const handleOTP = async (otp: string) => {
    setLoader(true);
    if (name != "") {
      const formdata = new FormData();
      formdata.append("otp", otp);
      formdata.append("username", name);
      const res = await handleVerifyOtp(formdata);
      console.log("response body of verify otp", res);

      if (res.status_code == 200) {
        const user = {
          email: res.data.email,
          phone: res.data.phone,
          username: res.data.username,
        };

        showToast("OTP verification successful", "success");
        // navigate("/");
        window.location.href = "/";
      } else {
        showToast(OTP_VERIFICATION_ERROR, "error");
        console.log("OTP verification failed");
      }
    }
    setLoader(false);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);

    const form = document.getElementById("registerform") as HTMLFormElement;
    const formData = new FormData(form);

    const day = parseInt(formData.get("date") as string, 10);
    const month = parseInt(formData.get("month") as string, 10);
    const year = parseInt(formData.get("year") as string, 10);

    console.log(day, month, year);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      // setMsg("Please enter a valid date of birth");
      showToast(INVALID_DOB, "info");
      console.error("Invalid date of birth");
      setLoader(false);
      return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
    const currentDay = new Date().getDate();

    if (day < 1 || day > 31) {
      showToast(INVALID_DATE, "info");
      setLoader(false);
      return;
    }

    if (month < 1 || month > 12) {
      showToast(INVALID_MONTH, "info");
      setLoader(false);
      return;
    }

    if (year > currentYear - 18) {
      // Assuming reasonable range for DOB year
      showToast("age less than 18", "info");
      setLoader(false);
      return;
    }

    // Age calculation
    let age = currentYear - year;
    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      age--;
    }

    if (age < 18) {
      // setMsg("You must be at least 18 years old to register");
      showToast(USER_UNDER_AGE, "info");
      setLoader(false);
      return;
    }

    const phone = ((formData.get("phonecode") as string).trim() +
      formData.get("phone")).trim() as string;
    const date = `${formData.get("year")}-${formData.get(
      "month"
    )}-${formData.get("date")}`;
    console.log(date);
    formData.set("phone", phone);
   
    formData.delete("year");
    formData.delete("month");
    formData.delete("date");
    formData.delete("phonecode");
    formData.set("dob", date);

    const res = await registerUser(formData);
    console.log(res);

    if (res.status_code == 200) {
      const name = res.data.username;
      setName(name);
      setShowOtp(true);
      setLoader(false);
      showToast("Successfully registered", "success");
    } else {
      if (res.message === undefined) {
        showToast(SERVER_ERROR_MESSAGE, "info");
        setLoader(false);
        return;
      }

      setLoader(false);
      showToast(res.message as string, "error");
    }

    // setShowOtp(true);
    // const res = await handleSendOtp(data.phone);
    // if (res === 0) {
    //   setSentOtp(true);
    // } else if (res === 1) {
    //   // handle error
    // }
  };

  const handleGoogleRegister = async () => {
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
  <Modal title="Create an account" id="register_modal">
  <div className="m-auto bg-[#11112B] rounded-2xl items-center justify-center w-80 p-4  ">
      {!showOtp ? (
      <>
        <form
        className="relative rounded"
        id="registerform"
        onSubmit={handleRegister}
      >
        <div className="mb-1">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            required
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
          />
        </div>
        <div className="mb-1">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            required
            minLength={5}
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
          />
        </div>
        <div className="mb-1">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Date of Birth
          </label>
          <div className="flex gap-3">
            <input
              inputMode="numeric"
              name="date"
              placeholder="DD"
              required
              //min and max date min 01 and max 31
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
            <input
              inputMode="numeric"
              name="month"
              placeholder="MM"
              required
              //not working min and max month please solve it

              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
            <input
              inputMode="numeric"
              name="year"
              placeholder="YYYY"
              required
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-1">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
            //min length 8 and character includinng special character
            pattern="^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
          />
        </div>
        <div className="mb-1">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Phone
          </label>
          <div className="flex gap-2">
            <input
              name="phonecode"
              placeholder="+91"
              required
              //by default value +91 but user can change it
              defaultValue="+91"
              className="shadow appearance-none w-1/3 rounded-lg h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
            <input
              //remove the indicator from input field
              inputMode="numeric"
              name="phone"
              placeholder=""
              required
              minLength={10}
              maxLength={10}
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#9562FF] border-[#A77CFF] text-white text-[1rem] font-medium w-full py-2 px-5 mt-2 rounded-[0.625rem] focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
        <p className="text-[#3f3f6a] text-[0.8rem] font-medium py-2 w-fit m-auto">
          OR
        </p>
        </form>
        <div className="flex items-center justify-between">
            <button
            type="button"
            onClick={handleGoogleRegister}
            className="border-2 border-solid border-[#3e3e6a] text-white font-medium text-[1rem] w-full py-2 px-4 rounded-[0.625rem]"
            >
            Continue with Google
            </button>
        </div>
      </>
  ) : (
      <div className="relative rounded ">
        <h2 className="text-[1.25rem] mb-1 text-center font-medium text-[#FFFFFF] leading-[30px]">
          Verify OTP
        </h2>
        <div className="mb-1">
          <label className="text-[#FFFFFF] text-sm font-medium mb-2">
            Enter OTP
          </label>
          <input
            inputMode="numeric"
            minLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleOTP(otp)}
            className="bg-[#9562FF] border-[#A77CFF] text-white text-[1rem] font-medium w-full py-2 px-5 mt-2 rounded-[0.625rem] focus:outline-none focus:shadow-outline"
          >
            Verify OTP
          </button>
        </div>
      </div>)
      }
        </div>
    </Modal>
  );
};

export default Register;