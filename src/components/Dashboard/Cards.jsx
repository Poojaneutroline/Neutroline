import React from "react";
import user from "../../images/card_user.png";
import appointment from "../../images/card_appointment.png";
import request from "../../images/card_request.png";
import ok from "../../images/card_ok.png";
import arrow from "../../images/card_arrow.png";

const Cards = () => {
  return (
    <>
      <div className="p-5">
      
        <div>
          <div className="flex justify-between ">
            <div
              className="bg-gradient-to-b from-[#D5FEC7] to-[#F5F5F5]
         h-[145px] w-[250px] rounded-[10px] border p-5 flex flex-col gap-1 "
            >
              <div> <h3 className="text-[18px]">Users</h3></div>
              <div className="flex justify-between">
                <p className="text-[24px]">250</p>
                <img src={user} className="mr-2 h-[35px] w-[35px] " />
              </div>
             
               
                <div className="flex items-center gap-1 justify-end mt-1">
                  <p className="text-[12px]">See all Users</p>
                  <img src={arrow} className="h-[12px] w-[12px] mt-1" />
               
              </div>
            </div>

            <div
              className="bg-gradient-to-b from-[#C7F1FE] to-[#F5F5F5]
         h-[145px] w-[250px] rounded-[10px] border p-5 flex flex-col gap-1 "
            >
              <div> <h3 className="text-[18px]">Total Appointments</h3></div>
              <div className="flex justify-between">
                <p className="text-[24px]">250</p>
                <img src={appointment} className="mr-2 h-[35px] w-[35px] " />
              </div>
             
               
                <div className="flex items-center gap-1 justify-end mt-1">
                  <p className="text-[12px]">See all Appointments</p>
                  <img src={arrow} className="h-[12px] w-[12px] mt-1" />
               
              </div>
            </div>

            <div
              className="bg-gradient-to-b from-[#E6C7FE] to-[#F5F5F5]
         h-[145px] w-[250px] rounded-[10px] border p-5 flex flex-col gap-1 "
            >
              <div> <h3 className="text-[18px]">Appointment Requests</h3></div>
              <div className="flex justify-between">
                <p className="text-[24px]">250</p>
                <img src={request} className="mr-2 h-[35px] w-[35px] " />
              </div>
             
               
                <div className="flex items-center gap-1 justify-end mt-1">
                  <p className="text-[12px]">See all Requests</p>
                  <img src={arrow} className="h-[12px] w-[12px] mt-1" />
               
              </div>
            </div>
          </div>
          <div className="flex  pt-8">
          <div
              className="bg-gradient-to-b from-[#FFCDCD] to-[#F5F5F5]
         h-[145px] w-[250px] rounded-[10px] border p-5 flex flex-col gap-1 "
            >
              <div> <h3 className="text-[18px]">Completed Appointments</h3></div>
              <div className="flex justify-between">
                <p className="text-[24px]">250</p>
                <img src={ok} className="mr-2 h-[35px] w-[35px] " />
              </div>
             
               
                <div className="flex items-center gap-1 justify-end mt-1">
                  <p className="text-[12px]">See all</p>
                  <img src={arrow} className="h-[12px] w-[12px] mt-1" />
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
