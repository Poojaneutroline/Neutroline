import React, { useState } from "react";
import edit from "../assets/editicon.svg";
import { Link } from "react-router-dom";
import BhourModal from "./BhourModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./bhours.css";
import Hours from "./Hours";
import ScheduleModal from "./ScheduleModal";
import schedule from "../assets/schedule.svg";
import info from "../assets/info.svg";


const BhoursC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSOpen, setModalSOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const openSModal = () => {
    setModalSOpen(true);
  };
  const onCloseSModal = () => setModalSOpen(false);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      <Modal
        open={modalSOpen}
        onClose={onCloseSModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <ScheduleModal onClose={onCloseSModal} />
      </Modal>
      {/* {modalOpen && <BhourModal setOpenModal={setModalOpen}  />} */}
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton:''
          
        }}
      >
        <BhourModal />
        {/* <Hours/> */}
      </Modal>
      <div className="pb-5 md:pb-20">
        <div
          className=" h-[220px] bg-[#eef0f6] rounded-[8px] p-5  shadow-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex justify-between ">
            <div className="flex gap-3 items-center ">
            <h1 className="text-[22px] text-[#0C1A97]">Business Hours</h1>
            <img src={info} alt="info" className="h-[16px] w-[16px] " title="Custom"/>

            </div>

            {isHovering && (
              <button onClick={openModal}>
                <img src={edit} className="h-[20px] w-[28px]" />
              </button>
            )}
          </div>
          <div className="flex gap-11 pt-3">
            <h3 className="w-[120px]  font-medium">Business Days</h3>
            <div className="flex gap-8">
              <h2 className="w-[60px]">Monday</h2>
              <p>-</p>
              <h2 className="w-[100px] ">Monday</h2>
            </div>
          </div>
          <div className="flex gap-11 pt-3 ">
            <h3 className="w-[120px]  font-medium">Work Hours</h3>
            <div className="flex gap-8">
              <h2 className="w-[60px] ">9:00</h2>
              <p>-</p>
              <h2 className="w-[100px] ">15:00</h2>
              <button  onClick={openSModal}
              className="ml-[-25%] cursor-pointer">
              <svg width="14" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 3H4.2002C3.08009 3 2.51962 3 2.0918 3.21799C1.71547 3.40973 1.40973 3.71547 1.21799 4.0918C1 4.51962 1 5.08009 1 6.2002V7M5 3H13M5 3V1M13 3H13.8002C14.9203 3 15.4796 3 15.9074 3.21799C16.2837 3.40973 16.5905 3.71547 16.7822 4.0918C17 4.5192 17 5.07899 17 6.19691V7M13 3V1M1 7V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H13.8031C14.921 19 15.48 19 15.9074 18.7822C16.2837 18.5905 16.5905 18.2842 16.7822 17.9079C17 17.4805 17 16.9215 17 15.8036V7M1 7H17M13 15H13.002L13.002 15.002L13 15.002V15ZM9 15H9.002L9.00195 15.002L9 15.002V15ZM5 15H5.002L5.00195 15.002L5 15.002V15ZM13.002 11V11.002L13 11.002V11H13.002ZM9 11H9.002L9.00195 11.002L9 11.002V11ZM5 11H5.002L5.00195 11.002L5 11.002V11Z" stroke="#8F9AFD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </button>
              {/* <img src={schedule} alt="schedule" 
               onClick={openSModal}
              className="w-[15px] h-[15px] ml-[-50px] cursor-pointer"/> */}
            
            </div>
          
          </div>
          <div className="flex gap-11 pt-3">
            <h3 className="w-[120px]  font-medium">Holidays</h3>
            <div className="flex gap-8">
              <h2 className="w-[60px] ">Saturday</h2>
              <p>-</p>
              <h2 className="w-[100px] ">Sunday</h2>
            </div>
          </div>
          <div className="flex gap-11 pt-3">
            <h3 className="w-[120px]  font-medium">Break</h3>
            <div className="flex gap-8">
              <h2 className="w-[60px] ">12:45</h2>
              <p>-</p>
              <h2 className="w-[100px] "> 13:25</h2>
            </div>
          </div>
          {/* <div className="flex justify-end border">
            <button
              onClick={openSModal}
              className="text-[12px] mt-[-5px] bottom-0 right-0   border-[#9f9f9f] hover:border-blue-700 hover:text-[#8645b1] transition duration-300 bg-[#f8f8f8] px-[5px] py-[4px] text-[#5B76FC] font-[600] shadow-md rounded-[4px] "
            >
              Custom
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BhoursC;
