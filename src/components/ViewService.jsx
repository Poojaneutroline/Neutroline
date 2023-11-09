import React from "react";
import preview from "../assets/preview.png";

const ViewService = ({ service, onCloseModal }) => {
  const availabilityItems = service.weekdays
    .filter((day) => day.visibility)
    .map((day) => {
      const options = [];
      if (day.option1 && day.option2) {
        options.push(`${day.option1} - ${day.option2}`);
      }
      if (day.option3 && day.option4) {
        options.push(`${day.option3} - ${day.option4}`);
      }
      if (day.option5 && day.option6) {
        options.push(`${day.option5} - ${day.option6}`);
      }
      const availabilityString = `${day.name}: ${options.join(", ")}`;
      return <div key={day.name} className="text-black">{availabilityString}</div>;
    });

 
  return (
    <div className="bg-[#f5f4f4]  w-[500px] rounded-[10px] ">
      <div className=" h-[70px] flex flex-col items-center justify-center bg-[#7495f1] rounded-t-[10px]">
        <h2 className="text-[#ffffff] text-[24px] font-[500]">Preview</h2>
        <div className=" w-full relative ">
          <img
            src={preview}
            className="w-[30px] h-[30px] absolute bottom-[-35px] left-1/2 transform -translate-x-1/2"
            alt=""
          />
        </div>
      </div>

      <div className="m-10 bg-[#e9f0f5] p-5 flex flex-col gap-5 rounded-[10px] border border-[#dadbed] shadow-shado2">
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
          <div className="flex flex-col gap-2">
            {availabilityItems}
          </div>
        </div>
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px] ">
            Duration:
          {" "}</div>
          <span className="text-black">{service.duration}</span>
        </div>
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px] border ">
            Visibility:
          {" "}</div>
          <span className="text-black">{service.visibility.toString()}</span>
        </div>
        <div className="flex gap-1">
          <div className="text-[16px] text-gray-600 mb-2 w-[110px] border flex ">
            Description:
          {" "}</div>
          <span className="text-black w-[70%] text-justify ">{service.description}</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#7899f6] text-[16px] text-white font-[500] px-[27px] py-[10px] rounded-[5px] shadow-md mb-6 mt-[-12px] "
          onClick={onCloseModal}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ViewService;
