import React, { useState } from "react";
import "./addnewservice.css";

const AddNewService = ({ setData, data, setOpenModal, handleToggle }) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedWeekday, setSelectedWeekday] = useState("");
  const [startTimes, setStartTimes] = useState([]);
  const [endTimes, setEndTimes] = useState([]);

  const handleWeekdaySelect = (selectedWeekday) => {
    setSelectedWeekday(selectedWeekday);
    setStartTimes([]);
    setEndTimes([]);
  };
  const handleTimeChange = (index, isStartTime, value) => {
    if (isStartTime) {
      setStartTimes((prevStartTimes) => {
        const updatedStartTimes = [...prevStartTimes];
        updatedStartTimes[index] = value;
        return updatedStartTimes;
      });
    } else {
      setEndTimes((prevEndTimes) => {
        const updatedEndTimes = [...prevEndTimes];
        updatedEndTimes[index] = value;
        return updatedEndTimes;
      });
    }
  };
  const [newService, setNewService] = useState({
    id: data.length + 1,
    duration: [
      "30 minutes",
      "1 hour",
      "1 hour 30 minutes",
      "2 hours",
      // Add more options as needed
    ],

    visibility: false,
  });
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setNewService((prevState) => ({
        ...prevState,
        availability: {
          ...prevState.availability,
          [name]: checked,
        },
      }));
    } else {
      setNewService((prevState) => ({ ...prevState, [name]: value }));
    }
  };
  const handleDuration = () => {
    return newService.duration.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };
  const handleSubmit = () => {
    // Validate the input before adding the new service
    if (
      newService.servicename.trim() === "" ||
      newService.availability.trim() === "" ||
      newService.duration.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Add the new service to the data array
    setData((prevState) => [...prevState, newService]);
    setOpenModal(false);
  };
  return (
    <div className="bg-[#e9edf5] w-[500px]  flex flex-col gap-4 px-6 py-4 rounded-md">
      <h2 className=" flex items-center justify-center text-[24px]">
        Add New Service
      </h2>
      <div>
        <label>
          Service Name
          <input
            type="text"
            name="servicename"
            autoFocus="false"
            // value={newService.servicename}
            // onChange={handleChange}
            placeholder="Service Name"
            className={`w-full rounded-[5px] mt-2  text-[14px] h-[39px]  border-[0.5px]   focus:bg-white focus:outline-none focus:ring-0.5 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#ffffffdf] shadow-shado2  placeholder:text-[13px]  md:w-full md:h-[45px] md:placeholder:text-[15px] md:pl-4`}
          />
        </label>
      </div>
      <div className="flex justify-between ">
        <div>
          <label>Availability</label>
        </div>
        <div>
          <div className="flex items-center  gap-3 ">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="default"
                  // checked={selectedOption === "default"}
                  // onChange={handleOptionChange}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out "
                />
                <span className="ml-2 text-[14px] text-[#0C1A97] font-normal">
                  Default
                </span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="custom"
                  // checked={selectedOption === "custom"}
                  // onChange={handleOptionChange}
                  className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out "
                />
                <span className="ml-2 text-[14px] text-[#0C1A97] font-normal">
                  Custom
                </span>
              </label>
            </div>

            {/* {selectedWeekday && <p>Selected weekday: {selectedWeekday}</p>} */}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-full w-[150px] flex">
          <select
            value={selectedWeekday}
            onChange={(e) => handleWeekdaySelect(e.target.value)}
            className="block text-[14px] text-[600] h-[39px] border-[0.5px] bg-[#fafafa] rounded-[5px] shadow-shado2 focus:outline-none focus:ring-0.5 focus:ring-slate-500 w-[150px]"
          >
            <option value="">Select a weekday</option>
            {weekdays.map((weekday, index) => (
              <option key={index} value={weekday}>
                {weekday}
              </option>
            ))}
          </select>
        </div>
        <div>
          {selectedWeekday && (
            <div className="flex gap-3 items-center select_time">
              <select className="block text-[14px] h-[39px] border-[0.5px] rounded-[5px] w-[100px] shadow-shado2 focus:outline-none focus:ring-0.5 focus:ring-slate-500">
                <option value="">Select</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
              </select>
              <p>to</p>
              <select className="block text-[14px] h-[39px] border-[0.5px] rounded-[5px] w-[100px] shadow-shado2 focus:outline-none focus:ring-0.5 focus:ring-slate-500">
                <option value="">Select</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 AM">06:00 AM</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <label>Visibility</label>
          <div className="relative">
            {/* Hidden input to hold the toggle state */}
            <input
              type="checkbox"
              className="sr-only"
              checked={newService.checked}
              onChange={() => handleToggle(newService.id)} // Use onChange instead of onClick
            />
            {/* Track (background) */}
            <div
              className={`w-[35px] h-[16px] rounded-full shadow-inner ${
                newService.checked ? "bg-[#08A0E9]" : " bg-[#cdcdcd]"
              }`}
            ></div>
            {/* Thumb (circle) */}
            <div
              className={`absolute top-0 left-0 w-[16px] h-[16px] bg-white rounded-full shadow transform transition-transform ${
                newService.checked ? "translate-x-5" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label>Duration</label>
          <div className="custom-dropdown">
            <select
              name="duration"
              value={newService.duration}
              onChange={handleDuration}
              className="border w-full h-[50px] px-3 rounded-[5px] shadow-sm  "
            >
              <option value="">Select</option>
              <option value="30 Min">30 Min</option>
                <option value="1 Hour">1 Hour</option>
                <option value="1 Hour 30 Min">1 Hour 30 Min</option>
                <option value="2 Hour">2 Hour</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <label>
          Description
          <textarea
            name="description"
            value={newService.servicename}
            onChange={handleChange}
            placeholder="Description"
            className=" flex border w-full h-[100px] px-4 py-2 rounded-[5px] shadow-sm place-items-start bg-[#ffffffdf] mt-2 resize-none "
          />
        </label>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[#0AA1DD] text-[white] font-[500] font-inter p-4 rounded-[5px] flex justify-center mt-2 items-center text-[16px] h-[39px] "
          style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}
        >
          Add Service
        </button>
      </div>
    </div>
  );
};

export default AddNewService;
