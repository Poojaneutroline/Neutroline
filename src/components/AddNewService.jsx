import React, { useState } from "react";
import "./addnewservice.css";
import add from "../assets/add.png";
const AddNewService = ({ setData, data, setOpenModal, handleToggle }) => {
  const [newService, setNewService] = useState({
    id: data.length + 1,
    duration: ["30 minutes", "1 hour", "1 hour 30 minutes", "2 hours"],

    visibility: false,
  });
  const defaultOptions = {
    option1: "09:00 AM", // Set your default value for option1 here
    option2: "03:00 PM", // Set your default value for option2 here
    // ... Add more options as needed
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewService((prevState) => ({ ...prevState, [name]: value }));
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

  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    option1: defaultOptions.option1,
    option2: defaultOptions.option2, });
  const [selectedWeekday, setSelectedWeekday] = useState(null);
  const [useCustomHours, setUseCustomHours] = useState(false);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const toggleWeekday = (index) => {
    setSelectedWeekday(selectedWeekday === index ? null : index);
  };
  const handleOptionChange = (event) => {
    if (useCustomHours) {
      const { name, value } = event.target;
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        [name]: value,
      }));
    }
  };
 
  const handleCustomHoursToggle = () => {
    setUseCustomHours(!useCustomHours);
    if (!useCustomHours) {
      setSelectedOptions({ ...defaultOptions });
    } else {
      setSelectedOptions({
        option1: "",
        option2: "",
      });
    }
  };

  return (
    <div className="bg-[#e9edf5] w-[620px]  flex flex-col gap-4 px-6 py-4 rounded-md">
      <h2 className=" flex items-center justify-center text-[24px]">
        Add New Service
      </h2>
      <div className="mx-4 my-3">
        <label>
          Service Name
          <input
            type="text"
            name="servicename"
            autoFocus="false"
            // value={newService.servicename}
            // onChange={handleChange}
            placeholder="Service Name"
            className={`w-full rounded-[5px] mt-1  text-[14px] h-[39px]  border-[0.5px]   focus:bg-white focus:outline-none focus:ring-0.5 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#ffffffdf] shadow-shado2  placeholder:text-[13px]  md:w-full md:h-[45px] md:placeholder:text-[15px] md:pl-4`}
          />
        </label>
      </div>
      <div className="flex justify-end pr-4 mb-[-15px]">
    <label className="flex items-center gap-1  text-[13px]">
      <input
        type="radio"
        name="customizeHours"
        className="form-radio h-[13px] w-[13px] text-blue-500"
        onChange={handleCustomHoursToggle}
      />
      Customize Hours
    </label>
  </div>
      <div className="bg-[#f3f4f8] py-2 rounded-[10px] mx-4">
      <div className="flex justify-between   mx-4">
        <label>Availability</label>
      </div>

      <div className="flex  items-center justify-between mx-4">
        {weekdays.map((weekday, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedWeekday(selectedWeekday === index ? null : index)
            }
            className={`px-4 py-2 rounded-md text-[15px] border-[0.5px] border-[#e6e6e7] shadow-sm ${
              selectedWeekday === index
                ? "bg-blue-500 text-white"
                : "bg-[#f9fafd]"
            }`}
          >
            {weekday}
          </button>
        ))}
      </div>

      {selectedWeekday !== null && (
        <div className="flex items-center gap-3 mx-4 my-3 justify-center">
          <label className="w-[70px]">{weekdays[selectedWeekday]}</label>
          <div className="custom-dropdown">
            <select
              name={`option1`}
              value={useCustomHours ? selectedOptions.option1 : defaultOptions.option1}
              onChange={handleOptionChange}
              className="text-[15px] border w-[100px] h-[35px] px-3 rounded-[5px] shadow-sm focus:ring-0.5"
            >
              
              <option value={defaultOptions.option1}>Select</option>
                          <option value="08:00 AM">08:00 AM</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
            </select>
          </div>
          <div className="custom-dropdown">
            <select
              name={`option2`}
              value={useCustomHours ? selectedOptions.option2 : defaultOptions.option2}
              onChange={handleOptionChange}
              className="text-[15px] border w-[100px] h-[35px] px-3 rounded-[5px] shadow-sm focus:ring-0.5"
            >
              <option value={defaultOptions.option2}>Select</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
              {/* Add your options for Option 2 */}
            </select>
          </div>
        </div>
      )}
      </div>
      <div className="flex justify-between items-center mx-4 my-3">
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
      <div className="flex flex-col mx-4 ">
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

      <div className="flex items-center justify-center m-3">
        <button
          onClick={handleSubmit}
          className="bg-[#0AA1DD] text-[white] font-[500] font-inter p-4 rounded-[5px] flex justify-center  items-center text-[16px] h-[39px] "
          style={{ boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)" }}
        >
          Add Service
        </button>
      </div>
    </div>
  );
};

export default AddNewService;
