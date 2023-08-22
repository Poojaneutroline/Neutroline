import React, { useState } from "react";
import edit from "../assets/editicon.svg";
import { Link } from "react-router-dom";
import BhourModal from "./BhourModal";
import icon_edit from "../assets/icon-edit.svg";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./bhours.css"
import Hours from "./Hours";

const Bhours = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      {/* {modalOpen && <BhourModal setOpenModal={setModalOpen}  />} */}
      <Modal open={modalOpen} onClose={onCloseModal} center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          
        }}>
        <BhourModal/>
        {/* <Hours/> */}
      </Modal>
      <div className="pb-[20px]">
        <div
          className=" h-[220px] bg-[#eef0f6] rounded-[8px] p-5  shadow-md"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
         
          <div className="flex justify-between ">
         
            <h1 className="text-[22px] text-[#0C1A97]">Business Hours</h1>

            {isHovering && (
              <button onClick={openModal} >
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
          <div className="flex gap-11 pt-3">
            <h3 className="w-[120px]  font-medium">Work Hours</h3>
            <div className="flex gap-8">
            <h2 className="w-[60px] ">9:00</h2>
            <p>-</p>
            <h2 className="w-[100px] ">15:00</h2>
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
        </div>
      </div>
    </>
  );
};

export default Bhours;
