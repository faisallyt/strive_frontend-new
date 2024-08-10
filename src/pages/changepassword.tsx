import { changePasswordAPI } from "@/Auth/Login";
import { showToast } from "@/app/notifier/toast";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ChangePassword = ({ setLoader = (t: boolean) => {} }) => {
  const [msg, setMsg] = React.useState("");
  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    // setChangePassword(true);

    //formdata
    const form = document.getElementById("changepassword") as HTMLFormElement;
    const formData = new FormData(form);

    console.log("formdata", formData);
    setLoader(true);
    const res = await changePasswordAPI(formData);
    console.log("response body of change password", res);

    if (res.status_code == 200) {
      setMsg(res.message);
      showToast(`${msg}`, "success");
      window.location.href = "/";
    } else {
      setMsg(res.message);
      showToast(`${msg}`, "error");
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(false);
    return () => {
      setLoader(true);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-[90%] md:w-[29%] bg-[#11112B] rounded-2xl flex flex-col items-center justify-center p-4">
        <form
          className="w-full relative rounded px-[1rem] py-[1rem] "
          id="changepassword"
          onSubmit={handleChangePassword}
        >
          <h2 className="text-[1.25rem] mb-2 text-center font-medium text-[#FFFFFF] leading-[30px]">
            Change password
          </h2>
          <div className="absolute top-[0rem] right-[0rem]">
            <IoClose className="text-[#8E84A3] font-bold text-lg hover:scale-125 hover:cursor-pointer" />
          </div>
          <div className="mb-4">
            <label className="text-[#FFFFFF] text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              required={true}
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#FFFFFF] text-sm font-medium mb-2">
              Old password
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old-password"
              required={true}
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="text-[#FFFFFF] text-sm font-medium mb-2">
              New password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new-password"
              required={true}
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 mt-1 bg-[#090C23] text-[#9094A6] text-[0.88rem] leading-tight focus:outline-1 focus:shadow-outline"
            />
          </div>
          <p className="text-red-700 text-sm">{msg}</p>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#9562FF] border-[#A77CFF] text-white text-[1rem] font-medium w-full py-2 px-5 rounded-[0.625rem] focus:outline-none focus:shadow-outline"
            >
              Submit {/* {loading ? "Logging in..." : "Continue"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
