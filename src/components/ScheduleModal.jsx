import React, { useState, useEffect, useContext } from "react";
import preview from "../assets/preview.png";
import right from "../assets/right.svg";
import { AppContext } from "../AppContext";

const ScheduleModal = ({ onClose, setOpenModal }) => {
  const { businessDataFromModal } = useContext(AppContext);
  const { workHours, additionalWorkDays } = businessDataFromModal;

  // Get current day index
  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  };

  // Generate weekdays array dynamically
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const weekdaysData = weekdays.map((day, dayIndex) => {
    const additionalWorkDayIndex = dayIndex % additionalWorkDays.length; // Use modulo operator to cycle through additional work days

  const additionalWorkDay = additionalWorkDays[additionalWorkDayIndex]|| {};

    // Default work hours from workHours object
  const workfrom= workHours[`${day.toLowerCase()}WorkHoursFrom`];
  const   workto= workHours[`${day.toLowerCase()}WorkHoursTo`];
  const  breakfrom= workHours[`${day.toLowerCase()}BreakFrom`];
  const   breakto= workHours[`${day.toLowerCase()}BreakTo`];

  // Additional work hours (index 0 and 1)
  const additionalWorkFrom1 = additionalWorkDays[0]?.[`${day.toLowerCase()}WorkHoursFrom`] || "";
  const additionalWorkTo1 = additionalWorkDays[0]?.[`${day.toLowerCase()}WorkHoursTo`] || "";
  const additionalWorkFrom2 = additionalWorkDays[1]?.[`${day.toLowerCase()}WorkHoursFrom`] || "";
  const additionalWorkTo2 = additionalWorkDays[1]?.[`${day.toLowerCase()}WorkHoursTo`] || "";
    return {
      day,
      workfrom, 
      workto,
      breakfrom,
      breakto,
      additionalWorkFrom1,
      additionalWorkTo1,
      additionalWorkFrom2,
      additionalWorkTo2,
     
    };
    
  });

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

  return (
    <div className="bg-[#fbfbfd] w-[550px] rounded-[10px] pb-3">
      <div className="h-[65px] flex flex-col items-center justify-center bg-[#92abf7] rounded-t-[10px] mb-5">
        <h2 className="text-[#ffffff] text-[24px] font-[600]">Business Hours</h2>
        <div className="w-full relative">{/* Add your preview image here */}</div>
      </div>

      {weekdaysData.map((day, index) => (
        <div
          key={index}
          className={`flex gap-8 items-center p-2 rounded-[4px] ${
            rotationStates[index] ? "bg-[#e8eefc]" : "bg-[#fbfbfd]"
          } shadow-sm m-4 ${
            index === getCurrentDayIndex()
              ? "border-l-4 border-blue-500"
              : "border-l-4 border-blue-200"
          } transition-all duration-500 ease-in-out transform`}
        >
          <div className="flex flex-col gap-1">
            <div
              onClick={() => handleRotateClick(index)}
              className="flex text-[15px] text-[#3835be] w-[110px] font-[500] items-center gap-4"
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
              <div className="h-full text-[#5a5a5a] text-[13px] text-center rounded-lg flex flex-col items-center ml-[45px] py-1 px-4 w-full">
                <div className="flex gap-2 ml-7 mt-2">
                  <h4 className="text-[12px] w-[100px] font-[600] flex items-start">WORK HOURS</h4>
                  <div className="flex flex-col gap-4">
                    <span className="text-[12px] text-[#8562ee]">{day.workfrom}-{day.workto} </span>
                    
                    {day.additionalWorkFrom1 && (
        <span className="text-[12px] text-[#8562ee]">
          {day.additionalWorkFrom1} - {day.additionalWorkTo1}
        </span>
      )}
      {day.additionalWorkFrom2 && (
        <span className="text-[12px] text-[#8562ee]">
          {day.additionalWorkFrom2} - {day.additionalWorkTo2}
        </span>
      )}
                    
                  </div>
                </div>
                <div className="flex gap-2 ml-7 mt-2">
                  <h4 className="text-[12px] w-[100px] font-[600] flex items-start">BREAK</h4>
                  <div className="flex gap-4">
                    <span className="text-[12px] text-[#8562ee]">{day.breakfrom}</span>
                    <p>-</p>
                    <span className="text-[#8562ee]">{day.breakto}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center">
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
