import React, { useState, useEffect, useContext } from "react";
import "./bhourmodal.css";
import trash from "../assets/trash.png";
import add from "../assets/add.png";
import hour from "../assets/hour.svg";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import { AppContext } from "../AppContext";
import { isDisabled } from "@testing-library/user-event/dist/utils";
function BhourModal({ setOpenModal, onClose }) {
  const { setBusinessDataFromModal, setShowModal } = useContext(AppContext);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [bhourData, setBhourData] = useState({
    businessDaysFrom: "",
    businessDaysTo: "",
    businessDaysFromOp2:"",
    businessDaysToOp2:"",
    businessDaysFromOp3:"",
    businessDaysToOp3:"",
    WorkHoursFrom: "",
    WorkHoursTo: "",
    BreakFrom: "",
    BreakTo: "",
    holidayFrom: "",
    holidayTo: "",
    holidayFromOp2: "",
    holidayToOp2: "",
    holidayFromOp3: "",
    holidayToOp3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value === "Select" ? "" : value; // If value is "Select", set it to empty string, else use the selected value

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

  const [selectedOption, setSelectedOption] = useState("default");
  useEffect(() => {
    // Set default values when the component mounts
    setDefaultValues();
  }, []);

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

  const [data, setData] = useState([
    {
      id: 1,
      visibility: false,
    },
  ]);

  const [selectedDay, setSelectedDay] = useState("Mon");

  const isDefaultMode = selectedOption === "default";

  const [clickedDays, setClickedDays] = useState([]);

  const handleDayClick = (day) => {
    if (clickedDays.includes(day)) {
      setClickedDays(clickedDays.filter((item) => item !== day));
    } else {
      setClickedDays([...clickedDays, day]);
    }
  };

  const toggleWorkHourAndBreak = (day) => {
    if (isDefaultMode && (day === "Sat" || day === "Sun")) {
      return;
    }
    const isEnabledDay =
    (bhourData.businessDaysFrom &&
    bhourData.businessDaysTo &&
    daysOfWeek.indexOf(day) >= daysOfWeek.indexOf(bhourData.businessDaysFrom) &&
    daysOfWeek.indexOf(day) <= daysOfWeek.indexOf(bhourData.businessDaysTo)) ||
    additionalBusinessDays.some((additionalDay) => {
      const fromIndex = daysOfWeek.indexOf(additionalDay.from);
      const toIndex = daysOfWeek.indexOf(additionalDay.to);
      return (
        fromIndex <= daysOfWeek.indexOf(day) && daysOfWeek.indexOf(day) <= toIndex
      );
    });


  if (isEnabledDay) {
    setSelectedDay(selectedDay === day ? null : day);
    handleDayClick(day);
  }else{
    setSelectedDay(null);
    setClickedDays(clickedDays.filter((item) => item !== day)); // Deselect clicked day

  }
  };

  const [additionalBusinessDays, setAdditionalBusinessDays] = useState([]);

  const [additionalWorkDays, setAdditionalWorkDays] = useState([]);
  const [additionalHolidays, setAdditionalHolidays] = useState([]);

  const handleAddClick = () => {
    if (additionalBusinessDays.length < 2) {
      setAdditionalBusinessDays([
        ...additionalBusinessDays,
        { from: "", to: "" },
      ]);
    }
  };
  const handleAdditionalBusinessDayChange = (index, field, value) => {
    const updatedAdditionalBusinessDays = [...additionalBusinessDays];
  
    if (field === "delete") {
      updatedAdditionalBusinessDays.splice(index, 1); // Remove the selected entry
    
    } else {
      updatedAdditionalBusinessDays[index][field] = value;
    }
  
    if (index === 0) {
      setBhourData((prevData) => ({
        ...prevData,
        businessDaysFromOp2: updatedAdditionalBusinessDays[0]?.from || "",
        businessDaysToOp2: updatedAdditionalBusinessDays[0]?.to || "",
      }));
    } else if (index === 1) {
      setBhourData((prevData) => ({
        ...prevData,
        businessDaysFromOp3: updatedAdditionalBusinessDays[1]?.from || "",
        businessDaysToOp3: updatedAdditionalBusinessDays[1]?.to || "",
      }));
    }
  // Update business days from/to in the state
  const businessDaysFromOp2 = updatedAdditionalBusinessDays[0]?.from || "";
  const businessDaysToOp2 = updatedAdditionalBusinessDays[0]?.to || "";
  const businessDaysFromOp3 = updatedAdditionalBusinessDays[1]?.from || "";
  const businessDaysToOp3 = updatedAdditionalBusinessDays[1]?.to || "";

  setBhourData((prevData) => ({
    ...prevData,
    businessDaysFromOp2,
    businessDaysToOp2,
    businessDaysFromOp3,
    businessDaysToOp3,
  }));
    setAdditionalBusinessDays(updatedAdditionalBusinessDays);
  };
  

  const handleAdditionalWorkDay = (index, field, value) => {
    const updatedAdditionalWorkDays = [...additionalWorkDays];
    if (field === "delete") {
      updatedAdditionalWorkDays.splice(index, 1); // Remove the selected entry
    } else {
      // Check if the day already exists in additionalWorkDays, if not, add it
      if (updatedAdditionalWorkDays.length <= index) {
        updatedAdditionalWorkDays[index] = { from: "", to: "" };
      }
      // Update the selected day's work hours
      updatedAdditionalWorkDays[index][field] = value;
    }
  
    // Update work hours for the respective selected day
    const daysOfWeekLowerCase = daysOfWeek.map(day => day.toLowerCase());
  
    const updatedBhourData = {
      ...bhourData,
      workHoursFromOp2: daysOfWeekLowerCase.map(day => updatedAdditionalWorkDays[0]?.from || ""),
      workHoursToOp2: daysOfWeekLowerCase.map(day => updatedAdditionalWorkDays[0]?.to || ""),
      workHoursFromOp3: daysOfWeekLowerCase.map(day => updatedAdditionalWorkDays[1]?.from || ""),
      workHoursToOp3: daysOfWeekLowerCase.map(day => updatedAdditionalWorkDays[1]?.to || ""),
    };
  
    setBhourData(updatedBhourData);
    
    setAdditionalWorkDays(updatedAdditionalWorkDays);
  };
  
  const handleAddWork = () => {
    if (additionalWorkDays.length < 2) {
      const newWorkDay = { [`${selectedDay.toLowerCase()}WorkHoursFrom`]: "", [`${selectedDay.toLowerCase()}WorkHoursTo`]: "" };
      setAdditionalWorkDays([...additionalWorkDays, newWorkDay]);
    }
  };
  
  const handleAdditionalHolidays = (index, field, value) => {
    const updatedAdditionalHolidays = [...additionalHolidays];
    if (field === "delete") {
      updatedAdditionalHolidays.splice(index, 1);
    } else {
      updatedAdditionalHolidays[index][field] = value;
    }
  
    if (index === 0) {
      // First additional holiday
      setBhourData((prevData) => ({
        ...prevData,
        holidayFromOp2: updatedAdditionalHolidays[0]?.from || "",
        holidayToOp2: updatedAdditionalHolidays[0]?.to || "",
      }));
    } else if (index === 1) {
      // Second additional holiday
      setBhourData((prevData) => ({
        ...prevData,
        holidayFromOp3: updatedAdditionalHolidays[1]?.from || "",
        holidayToOp3: updatedAdditionalHolidays[1]?.to || "",
      }));
    }
  // Update holidays from/to in the state
  const holidayFromOp2 = updatedAdditionalHolidays[0]?.from || "";
  const holidayToOp2 = updatedAdditionalHolidays[0]?.to || "";
  const holidayFromOp3 = updatedAdditionalHolidays[1]?.from || "";
  const holidayToOp3 = updatedAdditionalHolidays[1]?.to || "";

  setBhourData((prevData) => ({
    ...prevData,
    holidayFromOp2,
    holidayToOp2,
    holidayFromOp3,
    holidayToOp3,
  }));
    setAdditionalHolidays(updatedAdditionalHolidays);
  };
  
  const handleAddHolidays = () => {
    if (additionalHolidays.length < 2) {
      const newHolidays = { from: "", to: "" };
      setAdditionalHolidays([...additionalHolidays, newHolidays]);
  
      if (additionalHolidays.length === 0) {
        // First addition
        setBhourData((prevData) => ({
          ...prevData,
          holidayFromOp2: newHolidays.from,
          holidayToOp2: newHolidays.to,
        }));
      } else if (additionalHolidays.length === 1) {
        // Second addition
        setBhourData((prevData) => ({
          ...prevData,
          holidayFromOp3: newHolidays.from,
          holidayToOp3: newHolidays.to,
        }));
      }
    }
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
  function isCurrentDay(day) {
    const currentDayIndex = getCurrentDayIndex();
    return daysOfWeek[currentDayIndex] === day;
  }
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
  const handleSave = () => {
    // Gather the data to be saved
    const savedData = {
      mode: selectedOption,
      timezone: selectedTimezone,
      workHours: { ...bhourData },
      additionalBusinessDays: [...additionalBusinessDays],
      additionalWorkDays: [...additionalWorkDays],
      additionalHolidays: [...additionalHolidays],
    };
    // console.log("Saved Data:", savedData.workHours);
    setBusinessDataFromModal(
      savedData);

    onClose(true);
  };
  const isDisabledHolidayOption = (day) => {
    const businessDaysFromIndex = daysOfWeek.indexOf(bhourData.businessDaysFrom);
    const businessDaysToIndex = daysOfWeek.indexOf(bhourData.businessDaysTo);
    const dayIndex = daysOfWeek.indexOf(day);
  
    const isDisabledBusinessDays =
      bhourData.businessDaysFrom &&
      bhourData.businessDaysTo &&
      dayIndex >= businessDaysFromIndex &&
      dayIndex <= businessDaysToIndex;
  
    const isDisabledAdditionalBusinessDays = additionalBusinessDays.some(
      (additionalDay) => {
        const fromIndex = daysOfWeek.indexOf(additionalDay.from);
        const toIndex = daysOfWeek.indexOf(additionalDay.to);
        return (
          fromIndex <= dayIndex && dayIndex <= toIndex
        );
      }
    );
  
    return isDisabledBusinessDays || isDisabledAdditionalBusinessDays;
  };
  
  const isDisabledHolidayToOption = (day) => {
    const isDisabledBusinessDaysTo = bhourData.holidayFrom === day;
  
    const isDisabledAdditionalBusinessDaysTo = additionalBusinessDays.some(
      (additionalDay) => additionalDay.from === day || additionalDay.to === day
    );
  
    return isDisabledBusinessDaysTo || isDisabledAdditionalBusinessDaysTo;
  };
  
  const timeOptions = [
    "08:00 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM"
  ];
  
  return (
    <div className="modalContainer">
      <div className="titleCloseBtn"></div>
      <div className="title">
        <img src={hour} alt="hour" className="h-[20px] w-[20px]" />
        <h1>Business Hours</h1>
      </div>
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
      </div>

      <TimezoneSelect
        sx={{ height: "5px", backgroundColor: "#FDFBFB" }}
        value={selectedTimezone}
        onChange={setSelectedTimezone}
        labelStyle="altName"
        className="text-[14px] w-[390px] shadow-sm mt-2 hover:shadow-md"
      />
      <div className="business_days  max-h-[100px] overflow-y-auto">

        <h2>Business Days</h2>
        <div className="select_days flex flex-col">
          <div className="flex items-center gap-3">
            <select
              value={bhourData.businessDaysFrom}
              name="businessDaysFrom"
              onChange={handleChange}
              className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"
            >
              <option value="">Select</option>
              {daysOfWeek.map((day) => (
                <option
                  key={day}
                  value={day}
                  disabled={bhourData.businessDaysTo === day}
                >
                  {day}
                </option>
              ))}
            </select>

            <p>to</p>
            <select
              value={bhourData.businessDaysTo}
              onChange={handleChange}
              name="businessDaysTo"
              className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"
            >
              <option value="">Select</option>
              {daysOfWeek
    .filter((day) => daysOfWeek.indexOf(day) > daysOfWeek.indexOf(bhourData.businessDaysFrom))
    .map((day) => (
      <option
        key={day}
        value={day}
        disabled={bhourData.businessDaysFrom === day}
      >
        {day}
      </option>
    ))}
            </select>
          </div>
          {selectedOption === "custom" &&
            additionalBusinessDays.map((data, index) => (
              <div
                key={index}
                className="ml-[30px] mb-[-10px]  flex gap-[12px] items-center pb-[10px]"
              >
                <select
                  value={data.from}
                  name={`additionalBusinessDayFrom_${index}`}
                  onChange={(e) =>
                    handleAdditionalBusinessDayChange(
                      index,
                      "from",
                      e.target.value
                    )
                  }
                  className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"                  
                >
                  <option value="">Select</option>
                  {index === 0
          ? daysOfWeek
              .slice(daysOfWeek.indexOf(bhourData.businessDaysTo) + 1)
              .map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))
          : daysOfWeek
              .slice(
                daysOfWeek.indexOf(
                  additionalBusinessDays[index - 1].to || bhourData.businessDaysTo
                ) + 1
              )
              .map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
                </select>
                <p>to</p>
                <select
                  value={data.to}
                  name={`additionalBusinessDayTo_${index}`}
                  onChange={(e) =>
                    handleAdditionalBusinessDayChange(
                      index,
                      "to",
                      e.target.value
                    )
                  }
                  className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                >
                  <option value="">Select</option>
                  {daysOfWeek
          .slice(
            daysOfWeek.indexOf(
              additionalBusinessDays[index].from || bhourData.businessDaysFrom
            ) + 1
          )
          .map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
                </select>
                <img
                  src={trash}
                  alt="trash"
                  className=" h-[15px] w-[18px]"
                  onClick={() =>
                    handleAdditionalBusinessDayChange(index, "delete")
                  }
                />
              </div>
            ))}
        </div>

        <div className="edit">
          {selectedOption === "custom" && (
            <img src={add} onClick={handleAddClick} />
          )}
        </div>
      </div>

      <div className="days">
        <h2>Days</h2>
        <div className="flex flex-col w-full">
          <div className="button_days">
            {daysOfWeek.map((day) => {
              const shortDay = day.slice(0, 3); // Get the first three letters of the weekday
              const isDisabled =
      (bhourData.businessDaysFrom &&
      bhourData.businessDaysTo &&
      daysOfWeek.indexOf(day) >=
        daysOfWeek.indexOf(bhourData.businessDaysFrom) &&
      daysOfWeek.indexOf(day) <=
        daysOfWeek.indexOf(bhourData.businessDaysTo)) ||
      additionalBusinessDays.some((additionalDay) => {
        const fromIndex = daysOfWeek.indexOf(additionalDay.from);
        const toIndex = daysOfWeek.indexOf(additionalDay.to);
        return (
          fromIndex <= daysOfWeek.indexOf(day) && daysOfWeek.indexOf(day) <= toIndex
        );
      });

              return (
                <div key={day} className="day_container">
                  <button
                    key={day}
                    onClick={() => toggleWorkHourAndBreak(day)}
                    className={`day-button ${
                      isCurrentDay(day) ? "selected-day" : ""
                    } ${clickedDays.includes(day) ? "clicked-day" : ""} ${
                      isDisabled ? "" : "disabled-day"
                    }`}
                    disabled={!isDisabled}
                  >
                    {shortDay}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center ml-[40px]">
            {daysOfWeek.map((day) => (
              
              <div key={day} className="day_container  ">
                {selectedDay === day && (
                
                  <>
                    <div className="work_hours ">
                      <h2> Work Hours</h2>
                      <div className="select_time  ml-[-15px]">
                        <select
                          value={bhourData[`${day.toLowerCase()}WorkHoursFrom`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}WorkHoursFrom`}
                          className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                        >
                          <option value="">Select</option>
                          {timeOptions
    .filter((time) => {
      const selectedTimeIndex = timeOptions.indexOf(bhourData[`${day.toLowerCase()}WorkHoursFrom`]);
      const currentTimeIndex = timeOptions.indexOf(time);
      return selectedTimeIndex <= currentTimeIndex;
    })
    .map((time, index) => (
      <option key={index} value={time}>
        {time}
      </option>
    ))}
                        </select>
                        <p>to</p>
                        <select
                          value={bhourData[`${day.toLowerCase()}WorkHoursTo`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}WorkHoursTo`}
                          className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                        >
                          <option value="">Select</option>
                          {timeOptions
    .filter((time) => {
      const selectedTimeIndex = timeOptions.indexOf(bhourData[`${day.toLowerCase()}WorkHoursFrom`]);
      const currentTimeIndex = timeOptions.indexOf(time);
      return selectedTimeIndex < 0 || currentTimeIndex > selectedTimeIndex;
    })
    .map((time, index) => (
      <option key={index} value={time}>
        {time}
      </option>
    ))}
                        </select>
                      </div>
                      {selectedOption === "custom" && (
                        <img
                          src={add}
                          onClick={handleAddWork}
                          className={
                            selectedOption === "default" ? "hidden" : ""
                          }
                        />
                      )}
                    </div>
                    {selectedOption === "custom" &&
  additionalWorkDays.map((data, index) => {
    const previousRow =
      index > 0 ? additionalWorkDays[index - 1] : bhourData; // Get data from the previous row if it exists, otherwise use bhourData
    const selectedTimeTo = previousRow[`${selectedDay.toLowerCase()}WorkHoursTo`];

    return (
      <div key={index} className="select_time ml-[126px] mb-[-10px] mt-[10px] flex gap-[12px] items-center pb-[10px]">
        <select
          value={data[`${selectedDay.toLowerCase()}WorkHoursFrom`]}
          name={`additionalWorkDayFrom_${index}`}
          onChange={(e) => handleAdditionalWorkDay(index, `${selectedDay.toLowerCase()}WorkHoursFrom`, e.target.value)}
          className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"
        >
          <option value="">Select</option>
          {timeOptions
            .filter((time) => {
              const selectedTimeIndex = timeOptions.indexOf(selectedTimeTo);
              const currentTimeIndex = timeOptions.indexOf(time);
              return selectedTimeIndex < 0 || currentTimeIndex > selectedTimeIndex;
            })
            .map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
        </select>
        <p>to</p>
        <select
          value={data[`${selectedDay.toLowerCase()}WorkHoursTo`]}
          name={`additionalWorkDayTo_${index}`}
          onChange={(e) => handleAdditionalWorkDay(index, `${selectedDay.toLowerCase()}WorkHoursTo`, e.target.value)}
          className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"
        >
          <option value="">Select</option>
          {timeOptions
            .filter((time) => {
              const selectedTimeIndex = timeOptions.indexOf(data[`${selectedDay.toLowerCase()}WorkHoursFrom`]);
              const currentTimeIndex = timeOptions.indexOf(time);
              return selectedTimeIndex < 0 || currentTimeIndex > selectedTimeIndex;
            })
            .map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
        </select>
        <img
          src={trash}
          alt="trash"
          className="h-[15px] w-[18px]"
          onClick={() => handleAdditionalWorkDay(index, "delete")}
        />
      </div>
    );
  })}

                    <div className="work_hours">
                      <h2>Break</h2>
                      <div className="select_time ml-[-15px]">
                        <select
                          value={bhourData[`${day.toLowerCase()}BreakFrom`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}BreakFrom`}
                          className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                        >
                          <option value="">Select</option>
                          {timeOptions.map((time, index) => (
    <option key={index} value={time}>
      {time}
    </option>
  ))}
                        </select>
                        <p>to</p>
                        <select
                          value={bhourData[`${day.toLowerCase()}BreakTo`]}
                          onChange={handleChange}
                          name={`${day.toLowerCase()}BreakTo`}
                          className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                        >
                          <option value="">Select</option>
                          {timeOptions
    .filter((time) => {
      // Filter the options based on the selected value in breakFrom
      const selectedTimeIndex = timeOptions.indexOf(bhourData[`${day.toLowerCase()}BreakFrom`]);
      const currentTimeIndex = timeOptions.indexOf(time);
      // Include options that come after the selected value in breakFrom
      return selectedTimeIndex < 0 || currentTimeIndex > selectedTimeIndex;
    })
    .map((time, index) => (
      <option key={index} value={time}>
        {time}
      </option>
    ))}
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
      <div className="business_days max-h-[100px] overflow-y-auto">
        <h2>Holidays</h2>
        <div className="select_days flex flex-col">
          <div className="flex items-center gap-3">
            <select
              value={bhourData.holidayFrom}
              onChange={handleChange}
              name="holidayFrom"
              className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"
            >
              <option value="">Select</option>
              {daysOfWeek
    .filter(day => !isDisabledHolidayOption(day))
    .map(day => (
      <option key={day} value={day}>
        {day}
      </option>
    ))}
            </select>

            <p>to</p>
            <select
              value={bhourData.holidayTo}
              onChange={handleChange}
              name="holidayTo"
              className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"
            >
             <option value="">Select</option>
             {daysOfWeek
    .filter(day => !isDisabledHolidayOption(day) && day !== bhourData.holidayFrom) // Exclude the selected day in holidayFrom
    .map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
            </select>
          </div>
          {selectedOption === "custom" &&
            additionalHolidays.map((data, index) => (
              <div
                key={index}
                className="  ml-[30px] mb-[-10px]  flex gap-[12px] items-center pb-[10px]"
              >
                <select
                  value={data.from}
                  name={`additionalHolidaysFrom_${index}`}
                  onChange={(e) =>
                    handleAdditionalHolidays(index, "from", e.target.value)
                  }
                  className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                >
                  <option value="">Select</option>
                  {daysOfWeek
    .filter(day => !isDisabledHolidayOption(day) && day !== bhourData.holidayTo) // Exclude the selected day in holidayTo
    .map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
                </select>
                <p>to</p>
                <select
                  value={data.to}
                  name={`additionalHolidaysTo_${index}`}
                  onChange={(e) =>
                    handleAdditionalHolidays(index, "to", e.target.value)
                  }
                  className="focus:outline-none focus:ring-[0.5px] focus:ring-slate-500"

                >
                  <option value="">Select</option>
                  {daysOfWeek
    .filter(day => !isDisabledHolidayOption(day) && day !== bhourData.holidayFrom) // Exclude the selected day in holidayFrom
    .map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
                </select>
                <img
                  src={trash}
                  alt="trash"
                  className=" h-[15px] w-[18px]"
                  onClick={() => handleAdditionalHolidays(index, "delete")}
                />
              </div>
            ))}
        </div>

        <div className="edit">
          <img
            src={add}
            onClick={handleAddHolidays}
            className={selectedOption === "default" ? "hidden" : ""}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-5 ">
        <button
          className="bg-[#578ff7] text-[15px] text-[#ffffff] font-[500] px-[20px] py-[7px] rounded-[5px] shadow-md  hover:bg-[#6c9df9] hover:shadow-lg "
          onClick={handleSave} // Call handleSave function on save button click
        >
          Save
        </button>
        <button
          className="bg-[#fdfdfd] text-[15px] text-[#151127] font-[500] px-[20px] py-[7px] rounded-[5px] shadow-md hover:text-[#151127] hover:bg-[#f7f6f6]  "
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BhourModal;
