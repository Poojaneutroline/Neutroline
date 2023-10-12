import React, { useState, useEffect, useContext } from "react";
import preview from "../assets/preview.png";
import right from "../assets/right.svg";
import { AppContext } from "../AppContext";

const ScheduleModal = ({ onClose, setOpenModal }) => {
  const { businessDataFromModal } = useContext(AppContext);
  // console.log(businessDataFromModal.workHours);

  const Monday = {
    workfrom: businessDataFromModal.workHours.monWorkHoursFrom,
    workto: businessDataFromModal.workHours.monWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.monBreakFrom,
    breakto: businessDataFromModal.workHours.monBreakTo,
  };

  const Tuesday = {
    workfrom: businessDataFromModal.workHours.tueWorkHoursFrom,
    workto: businessDataFromModal.workHours.tueWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.tueBreakFrom,
    breakto: businessDataFromModal.workHours.tueBreakTo,
  };

  const Wednesday = {
    workfrom: businessDataFromModal.workHours.wedWorkHoursFrom,
    workto: businessDataFromModal.workHours.wedWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.wedBreakFrom,
    breakto: businessDataFromModal.workHours.wedBreakTo,
  };

  const Thursday = {
    workfrom: businessDataFromModal.workHours.thuWorkHoursFrom,
    workto: businessDataFromModal.workHours.thuWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.thuBreakFrom,
    breakto: businessDataFromModal.workHours.thuBreakTo,
  };

  const Friday = {
    workfrom: businessDataFromModal.workHours.friWorkHoursFrom,
    workto: businessDataFromModal.workHours.friWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.friBreakFrom,
    breakto: businessDataFromModal.workHours.friBreakTo,
  };

  const Saturday = {
    workfrom: businessDataFromModal.workHours.satWorkHoursFrom,
    workto: businessDataFromModal.workHours.satWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.satBreakFrom,
    breakto: businessDataFromModal.workHours.satBreakTo,
  };

  const Sunday = {
    workfrom: businessDataFromModal.workHours.sunWorkHoursFrom,
    workto: businessDataFromModal.workHours.sunWorkHoursTo,
    breakfrom: businessDataFromModal.workHours.sunBreakFrom,
    breakto: businessDataFromModal.workHours.sunBreakTo,
  };
  const weekdays = [
    {
      day: "Monday",
      workfrom: Monday.workfrom,
      workto: Monday.workto,
      breakfrom: Monday.breakfrom,
      breakto: Monday.breakto,
    },
    {
      day: "Tuesday",
      workfrom: Tuesday.workfrom,
      workto: Tuesday.workto,
      breakfrom: Tuesday.breakfrom,
      breakto: Tuesday.breakto,
    },
    {
      day: "Wednesday",
      workfrom: Wednesday.workfrom,
      workto: Wednesday.workto,
      breakfrom: Wednesday.breakfrom,
      breakto: Wednesday.breakto,
    },
    {
      day: "Thursday",
      workfrom: Thursday.workfrom,
      workto: Thursday.workto,
      breakfrom: Thursday.breakfrom,
      breakto: Thursday.breakto,
    },
    {
      day: "Friday",
      workfrom: Friday.workfrom,
      workto: Friday.workto,
      breakfrom: Friday.breakfrom,
      breakto: Friday.breakto,
    },
    {
      day: "Saturday",
      workfrom: Saturday.workfrom,
      workto: Saturday.workto,
      breakfrom: Saturday.breakfrom,
      breakto: Saturday.breakto,
    },
    {
      day: "Sunday",
      workfrom: Sunday.workfrom,
      workto: Sunday.workto,
      breakfrom: Sunday.breakfrom,
      breakto: Sunday.breakto,
    },
  ];

  const [rotationStates, setRotationStates] = useState(
    weekdays.map((_, index) => index === getCurrentDayIndex())
  );

  useEffect(() => {
    // Open the rotation state for the current day when the modal is opened
    setRotationStates((prevRotationStates) => {
      const newRotationStates = [...prevRotationStates];
      newRotationStates[getCurrentDayIndex()] = true;
      return newRotationStates;
    });
  }, []);

  const handleRotateClick = (index) => {
    setRotationStates((prevRotationStates) => {
      const newRotationStates = [...prevRotationStates];
      const isOpen = newRotationStates[index];

      // Close the open rotation state if clicking on a different day
      if (isOpen) {
        newRotationStates[index] = false;
      } else {
        newRotationStates.fill(false);
        newRotationStates[index] = true;
      }
      // Reopen the current day's rotation state if no index is provided
      if (index === undefined) {
        newRotationStates[getCurrentDayIndex()] = true;
      }

      return newRotationStates;
    });
  };
  function getCurrentDayIndex() {
    const today = new Date().getDay();
    // Since Sunday is not index 0 in getDay()
    return today === 0 ? 6 : today - 1;
  }
  // Check if all rotation states are closed, then open the current day's rotation state
  useEffect(() => {
    const areAllStatesClosed = rotationStates.every((state) => !state);
    if (areAllStatesClosed) {
      setRotationStates((prevRotationStates) => {
        const newRotationStates = [...prevRotationStates];
        newRotationStates[getCurrentDayIndex()] = true;
        return newRotationStates;
      });
    }
  }, [rotationStates]);

  return (
    <div className="bg-[#fbfbfd] w-[550px] rounded-[10px] pb-3">
      <div className=" h-[65px] flex flex-col items-center justify-center bg-[#92abf7] rounded-t-[10px] mb-5">
        <h2 className="text-[#ffffff] text-[24px] font-[600]">
          Business Hours
        </h2>
        <div className=" w-full relative">
          {/* <img
            src={preview}
            className="w-[30px] h-[30px] absolute bottom-[-35px] left-1/2 transform -translate-x-1/2"
            alt=""
          /> */}
        </div>
      </div>
      {/* bg-[#f1f3f9]  */}

      {weekdays.map((day, index) => (
        <div
          key={index}
          className={`flex gap-8 items-center p-2 rounded-[4px] 
           ${rotationStates[index] ? "bg-[#e8eefc]" : "bg-[#fbfbfd]"} 
        

          shadow-sm m-4 ${
            index === getCurrentDayIndex()
              ? " border-l-4 border-blue-500" // Add yellow border for the current day
              : "border-l-4 border-blue-200"
          } transition-all duration-500 ease-in-out transform `}
        >
          <div className="flex flex-col gap-1">
            <div
              onClick={() => handleRotateClick(index)}
              className="flex text-[15px] text-[#3835be]  w-[110px] font-[500] items-center gap-4 "
            >
              <img
                src={right}
                alt="right"
                className={`w-[12px] h-[14px] ml-2 transform ${
                  rotationStates[index] ? "rotate-90" : ""
                }`}
              />
              {day.day}
            </div>
            {rotationStates[index] && (
              <div className=" h-full   text-[#5a5a5a] text-[13px] text-center rounded-lg  flex flex-col items-center ml-[45px] py-1 px-4 w-full ">
                <div className="flex gap-2 ml-7 mt-2 ">
                  <h4 className="text-[12px] w-[100px] font-[600]  flex items-start ">
                    WORK HOURS
                  </h4>
                  <div className=" flex gap-4">
                    <span className="text-[12px] text-[#8562ee] ">
                      {" "}
                      {day.workfrom}
                    </span>
                    <p>-</p>
                    <span className="text-[#8562ee]">{day.workto}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-7 mt-2 ">
                  <h4 className="text-[12px] w-[100px] font-[600] flex items-start">
                    BREAK
                  </h4>
                  <div className=" flex gap-4">
                    <span className="text-[12px] text-[#8562ee] ">
                      {day.breakfrom}
                    </span>
                    <p>-</p>
                    <span className="text-[#8562ee]">{day.breakto}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center ">
        <button
          className="bg-[#547ef3] text-[16px] text-white font-[500] px-[20px] py-[8px] rounded-[5px] shadow-md hover:bg-[#4c73de] hover:shadow-md"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
