import React from "react";
import preview from "../assets/preview.png";

const ViewService = ({ service, onCloseModal }) => {
  return (
    <div className="bg-[#f5f4f4] h-[470px] w-[420px] rounded-[10px]">
      <div className=" h-[70px] flex flex-col items-center justify-center bg-[#aabef5] rounded-t-[10px]">
        <h2 className="text-[#060303] text-[20px] font-[400]">Preview</h2>
        <div className=" w-full relative">
          <img
            src={preview}
            className="w-[30px] h-[30px] absolute bottom-[-35px] left-1/2 transform -translate-x-1/2"
            alt=""
          />
        </div>
      </div>

      <div className="m-10 bg-white p-5 flex flex-col gap-5 rounded-[10px]">
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px]">
            Service Name:{" "}
          </div>
          <span className="text-black">{service.servicename}</span>
        </div>
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px] ">
            Availability:{" "}
          </div>
          <span className="text-black">{service.availability}</span>
        </div>
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px] ">
            Duration:
          </div>{" "}
          <span className="text-black">{service.duration}</span>
        </div>
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px] ">
            Visibility:
          </div>{" "}
          <span className="text-black">{service.visibility.toString()}</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#95AEF4] text-[18px] text-white font-[500] px-[27px] py-[10px] rounded-[5px] shadow-md "
          onClick={onCloseModal}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ViewService;
