import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "./calendar.css";

export default function CalendarDiwash({ onSelectDate }) {
  const [dateState, setDateState] = useState(new Date());

  const changeDate = (e) => {
    setDateState(e);
  };

  function handleSelectedData(e) {
    e.preventDefault();

    const selectedMomentDate = moment(dateState);

    const date = selectedMomentDate.format("MM/D");
    onSelectDate(date);
  }

  return (
    <div className="bg-[#ffffff] pb-6 ">
      <Calendar
        value={dateState}
        center
        onChange={changeDate}
        minDate={new Date()}
      />
      <p className=" text-center mt-2 mb-5 ">
        Selected date is{" "}
        <b className="text-[#8585e7] ">
          {moment(dateState).format("YYYY/MM/D")}
        </b>
      </p>

      <div className="flex justify-end mr-9">
        <button
          onClick={handleSelectedData}
          className=" flex tracking-[1px] text-[white] items-center py-2 px-6 text-[16px]  font-sans font-[600] rounded-md bg-[#6264d8] hover:bg-[#5355da]"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          OK
        </button>
      </div>
    </div>
  );
}