import React, { useState, useEffect } from "react";
import "./bhourmodal.css";
import trash from "../assets/trash.png";
import add from "../assets/add.png";
import hour from "../assets/hour.svg";
import TimezoneSelect, { allTimezones } from "react-timezone-select";

function BhourModal({ setOpenModal }) {
  const [bhourData, setBhourData] = useState({
    businessDaysFrom: "",
    businessDaysTo: "",
    WorkHoursFrom: "",
    WorkHoursTo: "",
    BreakFrom: "",
    BreakTo: "",
    holidayFrom: "",
    holidayTo: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBhourData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Function to set default values
  const setDefaultValues = () => {
    const defaultWorkHoursFrom = "09:00 AM";
    const defaultWorkHoursTo = "05:00 PM";
    const defaultBreakFrom = "12:00 PM";
    const defaultBreakTo = "01:00 PM";
    const defaultValuesByDay = daysOfWeek.reduce((acc, day) => {
      acc[`${day.toLowerCase()}WorkHoursFrom`] = defaultWorkHoursFrom;
      acc[`${day.toLowerCase()}WorkHoursTo`] = defaultWorkHoursTo;
      acc[`${day.toLowerCase()}BreakFrom`] = defaultBreakFrom;
      acc[`${day.toLowerCase()}BreakTo`] = defaultBreakTo;
      return acc;
    }, {});
    setBhourData({
      businessDaysFrom: "Monday",
      businessDaysTo: "Friday",
      holidayFrom: "Saturday",
      holidayTo: "Sunday",
      ...defaultValuesByDay,
    });
    setSelectedTimezone(defaultTimezone);
  };
  // Function to set custom values
  const setCustomValues = () => {
  const customValuesByDay = daysOfWeek.reduce((acc, day) => {
    acc[`${day.toLowerCase()}WorkHoursFrom`] = "Select";
    acc[`${day.toLowerCase()}WorkHoursTo`] = "Select";
    acc[`${day.toLowerCase()}BreakFrom`] = "Select";
    acc[`${day.toLowerCase()}BreakTo`] = "Select";
    return acc;
  }, {});
  
  setBhourData({
    businessDaysFrom: "",
    businessDaysTo: "",
    holidayFrom: "",
    holidayTo: "",
    ...customValuesByDay,
  });
};
  const [workHourOpen, setWorkHourOpen] = useState(false);
  const [breakOpen, setBreakOpen] = useState(false);

  const toggleWorkHour = () => {
    setWorkHourOpen(!workHourOpen);
  };

  const toggleBreak = () => {
    setBreakOpen(!breakOpen);
  };

  const [selectedOption, setSelectedOption] = useState("custom");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "default") {
      setDefaultValues();
      setSelectedTimezone(defaultTimezone);
    } else {
      setCustomValues();
    }
  };
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const defaultTimezone = "America/New_York"; // Set your default timezone here

  const [checked, setChecked] = useState(false);

  const handleToggle = (itemId) => {
    // Find the item in the data array and update its checked state
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    // Update the data array with the updatedData
    setData(updatedData);
  };
  const [data, setData] = useState([
    {
      id: 1,
      visibility: false,
    },
  ]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDay, setSelectedDay] = useState("Mon");

  const isDefaultMode = selectedOption === "default";

  const toggleWorkHourAndBreak = (day) => {
     if (isDefaultMode && (day === "Sat" || day === "Sun")) {
      return;
    }
    setSelectedDay(selectedDay === day ? null : day);
  };

  const [additionalBusinessDays, setAdditionalBusinessDays] = useState([]);
  // const [additionalBusinessDaysData, setAdditionalBusinessDaysData] = useState([]);

  // ... (other functions)

  const handleAddClick = () => {
    if (additionalBusinessDays.length < 2) {
      setAdditionalBusinessDays([...additionalBusinessDays, { from: "", to: "" }]);
    }
  };
  const handleAdditionalBusinessDayChange = (index, field, value) => {
    const updatedAdditionalBusinessDays = [...additionalBusinessDays];
    if (field === "delete") {
      updatedAdditionalBusinessDays.splice(index, 1); // Remove the selected entry
    } else {
      updatedAdditionalBusinessDays[index][field] = value;
    }
  
    setAdditionalBusinessDays(updatedAdditionalBusinessDays);
  };
  function getCurrentDayIndex() {
    const today = new Date().getDay();
    // Since Sunday is not index 0 in getDay()
    return today === 0 ? 6 : today - 1;
  }
  const openCurrentDay = () => {
    const currentDayIndex = getCurrentDayIndex();
    const currentDay = daysOfWeek[currentDayIndex];

    if (!selectedDay) {
      setSelectedDay(currentDay);
    }
  };
  useEffect(() => {
    // Open the work hours and break for the current day automatically
    const currentDayIndex = getCurrentDayIndex();
    setSelectedDay(daysOfWeek[currentDayIndex]);
  }, []);
  useEffect(() => {
    // Open the work hours and break for the current day automatically if no other days are open
    if (!selectedDay) {
      openCurrentDay();
    }
  }, []);


  return (
    <div className="modalContainer">
      <div className="titleCloseBtn"></div>
      <div className="title">
        <img src={hour} alt="hour" className="h-[20px] w-[20px]" />
        <h1>Business Hours</h1>
      </div>
      {/* <div className="border flex items-center justify-end bg-white rounded-[5px]">
         
          Central Time USA and Canada
          
         

        </div> */}

      <div className="flex items-center justify-start  w-full mr-5 gap-3 mt-5 ">
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

      <TimezoneSelect
        sx={{ height: "5px", backgroundColor: "#FDFBFB" }}
        value={selectedTimezone}
        onChange={setSelectedTimezone}
        //  placeholder= {"Select Time zone"}
        labelStyle="altName"
        className="text-[14px] w-[390px] shadow-sm mt-2 hover:shadow-md"
      />
      <div className="business_days  max-h-[100px] overflow-y-auto">
      {/* max-h-[100px] overflow-y-auto */}
        
        <h2>Business Days</h2>
        <div className="select_days flex flex-col">
          <div className="flex items-center gap-3">
          <select
            value={bhourData.businessDaysFrom}
            name="businessDaysFrom"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          
          <p>to</p>
          <select
            value={bhourData.businessDaysTo}
            onChange={handleChange}
            name="businessDaysTo"
          >
            <option value="">Select</option>

            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          </div>
          {additionalBusinessDays.map((data, index) => (
          <div key={index} className="  ml-[34px] mb-[-10px]  flex gap-[12px] items-center pb-[10px]">
             
            <select
              value={data.from}
              name={`additionalBusinessDayFrom_${index}`}
              onChange={(e) => handleAdditionalBusinessDayChange(index, "from", e.target.value)}
            >
              <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
            <p>to</p>
            <select
              value={data.to}
              name={`additionalBusinessDayTo_${index}`}
              onChange={(e) => handleAdditionalBusinessDayChange(index, "to", e.target.value)}
            >
              <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
            <img src={trash} alt="trash"  className=" h-[15px] w-[18px]" 
            onClick={() => handleAdditionalBusinessDayChange(index, "delete")}
            
          />
            </div>
           
        ))}
        </div>

        <div className="edit">
          <img
            src={add}
            onClick={handleAddClick}
            className={selectedOption === "default" ? "hidden" : ""}
          />
          {/* <img
            src={trash}
            className={selectedOption === "default" ? "hidden" : ""}
          /> */}
        </div>
        
        {/* {selectedWeekday && <p>Selected weekday: {selectedWeekday}</p>} */}
      </div>

      <div className="days">
        <h2>Days</h2>
        <div className="flex flex-col w-full">
          <div className="button_days">
            {daysOfWeek.map((day) => (
              <button key={day} onClick={() => toggleWorkHourAndBreak(day)}>
                {day}
              </button>
            ))}
          </div>
          <div className="flex items-center">
            {daysOfWeek.map((day) => (
              <div key={day} className="day_container h-[90px] ">
                {selectedDay === day && (
                  <>
                    <div className="work_hours">
                      <h2>{day} Work Hours</h2>
                      <div className="select_time">
                        <select
                          value={bhourData[`${day.toLowerCase()}WorkHoursFrom`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}WorkHoursFrom`}
                        >
                          <option value="">Select</option>
                          <option value="08:00 AM">08:00 AM</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                        </select>
                        <p>to</p>
                        <select
                          value={bhourData[`${day.toLowerCase()}WorkHoursTo`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}WorkHoursTo`}
                        >
                          <option value="">Select</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                          <option value="05:00 PM">05:00 PM</option>
                          <option value="06:00 AM">06:00 AM</option>
                        </select>
                      </div>
                    </div>
                    <div className="work_hours">
                      <h2>{day} Break</h2>
                      <div className="select_time">
                        <select
                          value={bhourData[`${day.toLowerCase()}BreakFrom`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}BreakFrom`}
                        >
                          <option value="">Select</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                        </select>
                        <p>to</p>
                        <select
                          value={bhourData[`${day.toLowerCase()}BreakTo`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}BreakTo`}
                        >
                          <option value="">Select</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="01:00 PM">01:00 PM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="business_days">
        <h2>Holidays</h2>
        <div className="select_days  flex flex-col">
        <div className="flex items-center gap-3">
          <select
            value={bhourData.holidayFrom}
            onChange={handleChange}
            name="holidayFrom"
          >
            <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <p>to</p>
          <select
            value={bhourData.holidayTo}
            onChange={handleChange}
            name="holidayTo"
          >
            <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          </div>
          {/* {additionalBusinessDays.map((data, index) => (
          <div key={index} className="select_days ml-7">
             
            <select
              value={data.from}
              name={`additionalBusinessDayFrom_${index}`}
              onChange={(e) => handleAdditionalBusinessDayChange(index, "from", e.target.value)}
            >
              <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
            <p>to</p>
            <select
              value={data.to}
              name={`additionalBusinessDayTo_${index}`}
              onChange={(e) => handleAdditionalBusinessDayChange(index, "to", e.target.value)}
            >
              <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            </select>
            <img src={trash} alt="trash" 
            onClick={() => handleAdditionalBusinessDayChange(index, "delete")}
            
          />
            </div>
           
        ))} */}
        </div>
        
        <div className="edit">
          <img
            src={add}
            // onClick={handleAddClick}
            className={selectedOption === "default" ? "hidden" : ""}
          />
          {/* <img
            src={trash}
            className={selectedOption === "default" ? "hidden" : ""}
          /> */}
        </div>

        {/* {selectedWeekday && <p>Selected weekday: {selectedWeekday}</p>} */}
      </div>
      
     
      <div className="flex items-center justify-end gap-4 mt-5 ">
        <button
          className="bg-[#578ff7] text-[15px] text-[#ffffff] font-[500] px-[20px] py-[7px] rounded-[5px] shadow-md  hover:bg-[#6c9df9] hover:shadow-lg "
          // onClick={onClose}
        >
          Save
        </button>
        <button
          className="bg-[#fdfdfd] text-[15px] text-[#151127] font-[500] px-[20px] py-[7px] rounded-[5px] shadow-md hover:text-[#151127] hover:bg-[#f7f6f6]  "
          // onClick={onClose}
        >
          Cancel
        </button>
      </div>
        {/* <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel */}
        {/* </button> */}
        {/* <button>Continue</button> */}
      </div>
  
  );
}

export default BhourModal;