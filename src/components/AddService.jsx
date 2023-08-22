import React, { useState } from "react";
import "./addservice.css";

const AddService = ({ setData, data, setOpenModal, handleToggle }) => {
  const [newService, setNewService] = useState({
    id: data.length + 1,
    servicename: "",
    availability: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
    duration: [
      "30 minutes",
      "1 hour",
      "1 hour 30 minutes",
      "2 hours",
      // Add more options as needed
    ],
    visibility: false,
  });
  const [show, setShow] = useState(true);

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
  const [selectedOption, setSelectedOption] = useState("custom");
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
   
  };
  const handleDuration = () => {
    return newService.duration.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };
  // State to manage the visibility of time select for each day
  const [showTimeSelect, setShowTimeSelect] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const handleToggleTimeSelect = (day) => {
    setShowTimeSelect((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  // Function to render the time select for a specific day
  const renderTimeSelect = (day) => {
    if (!showTimeSelect[day]) return null;
    return (
      <div className="flex items-center gap-2  px-3   ">
        <label className="w-[40px]">{day} </label>
        <select name="" id="">
          <option value="">Select</option>
          <option value="">9:00 AM</option>
          <option value="">10:00 AM</option>
          <option value="">11:00 AM</option>
        </select>
        <select name="" id="">
          <option value="">Select</option>
          <option value="">9:00 AM</option>
          <option value="">10:00 AM</option>
          <option value="">11:00 AM</option>
        </select>
      </div>
    );
  };
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
            value={newService.servicename}
            onChange={handleChange}
            placeholder="Service Name"
            className={`w-full border-none rounded-[5px] mt-2  text-[14px] h-[39px]  border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#ffffffdf] shadow-shado2  placeholder:text-[13px]  md:w-full md:h-[45px] md:placeholder:text-[15px] md:pl-4`}
          />
        </label>
      </div>
      <div className="flex gap-2 ">
        
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
          <label>Availability</label>
          <div className="flex items-center mr-5 gap-3 mt-5 ">
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="default"
              checked={selectedOption === "default"}
              onChange={handleOptionChange}
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
              checked={selectedOption === "custom"}
              onChange={handleOptionChange}
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
         
          <div className="bg-[#dceaff4d] flex flex-col">
            <div className=" flex p-1 rounded-[5px] px-5 mt-2 gap-4 ">
              {daysOfWeek.map((day) => (
                <div className="flex " key={day}>
                  <input
                    type="checkbox"
                    name={day}
                    checked={newService.availability[day]}
                    onChange={handleChange}
                    style={{ backgroundColor: "#A8CCD1" }}
                    onClick={() => handleToggleTimeSelect(day)}
                  />
                  <label className="p-1 text-[#575757] text-[15px]">
                    {day}
                  </label>
                </div>
              ))}
            </div>

            <div className={` overflow-y-auto   `} style={{ height: "70px" }}>
              <div className="flex flex-col gap-2 items-center justify-center ">
                {renderTimeSelect("Mon")}
                {renderTimeSelect("Tue")}
                {renderTimeSelect("Wed")}
                {renderTimeSelect("Thu")}
                {renderTimeSelect("Fri")}
                {renderTimeSelect("Sat")}
                {renderTimeSelect("Sun")}
              </div>
            </div>
          </div>
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
              {handleDuration()}
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

export default AddService;