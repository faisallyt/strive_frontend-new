import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    children: React.ReactNode;
    title: string;
    id: string;
}



const Modal: React.FC<ModalProps> = ({ children,title,id }) => {

  return (
    // Modal with background blured
    <dialog id={id} className="modal bg-[#11112B] rounded-2xl p-2">
        <div className="flex flex-row ">
            <h2 className="text-[1.25rem] mb-1 mx-auto text-center font-medium text-[#FFFFFF] leading-[30px]">
                {title}
            </h2>
            <form method="dialog" className="modal-backdrop">
                <button><IoClose className="text-[#8E84A3] font-bold text-lg hover:scale-125 hover:cursor-pointer" /></button>
            </form>
        </div>
    
      {children}
      
    </dialog>
  );
};

export default Modal;
