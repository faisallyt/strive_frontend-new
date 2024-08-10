import React from "react";
import "../app/globals.css";

const userdata = () => {
  return (
    <div className="w-{70%} h-{70%} bg-[#11112B] flex items-center justify-center">
      <form className="p-4 rounded md:w-1/2 w-4/5">
        <h2 className="text-3xl text-center font-semibold text-[#FFFFFF] mb-8">
          USER DATA
        </h2>
        <div className="mb-4">
          <label className=" text-[#FFFFFF] text-sm font-medium mb-2">
            First Name
          </label>
          <input
            id="firstname"
            placeholder="Firstname"
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className=" text-[#FFFFFF] text-sm font-medium mb-2">
            Lastname
          </label>
          <input
            id="lastname"
            placeholder="Lastname"
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className=" text-[#FFFFFF] text-sm font-medium mb-2">
            Country
          </label>
          <input
            id="country"
            placeholder="Country"
            className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="  text-[#FFFFFF] text-sm font-medium mb-2">
            Address
          </label>
          <div className="flex gap-2">
            <input
              id="address"
              placeholder="Street Address"
              className="shadow appearance-none rounded-lg w-1/4 h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className=" text-[#FFFFFF] text-sm font-medium mb-2">
              Postal Code
            </label>
            <input
              id="PostalCode"
              placeholder="Postal Code"
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className=" text-[#FFFFFF] text-sm font-medium mb-2">
              Zip Code
            </label>
            <input
              id="ZipCode"
              placeholder="Zip Code"
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className=" text-[#FFFFFF] text-sm font-medium mb-2">
              Avatar Id
            </label>
            <input
              id="AvatarID"
              placeholder="Avatar Id"
              className="shadow appearance-none rounded-lg w-full h-[38px] py-2 px-3 bg-[#111111] text-[#9094A6] leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className=" bg-gradient-to-r from-[#A370EF] to-[#772CE8] text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default userdata;
