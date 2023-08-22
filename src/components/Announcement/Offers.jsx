import React, { useState, useContext, useEffect } from "react";
import radio from "../../assets/radio1.png";
import right from "../../assets/right.png";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import OfferModal from "./OfferModal";
import edit from "../../assets/edit2.png";
import trash from "../../assets/trash2.png";
import info from "../../assets/info.svg";
import AddOffersModal from "./AddOffersModal";
import { AppContext } from "../../AppContext";

const Offers = () => {
  const { formDataFromModal } = useContext(AppContext);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);
  const [getformData, setGetformData] = useState(null);

  const initialFormData = {
    title: "",
    message: "",
    description: "",
    from: "",
    to: "",
  };
  const offersData = [
    {
      title: "Offer 1",
      message: "20% off for 30 min consultant",
      description: "Limited offer",
      from: "06-15",
      to: "06-16",
    },
    {
      title: "Offer 2",
      message: "10% off for 1 hour consultant",
      description: "Special discount",
      from: "06-20",
      to: "06-25",
    },
    // Add more offers as needed
  ];
  useEffect(() => {
    console.log(formDataFromModal);
  }, [formDataFromModal]);

  return (
    <div className=" flex flex-wrap gap-8">
      <Modal
        open={modalOpen}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <OfferModal
          setGetformData={setGetformData || initialFormData}
          closeModal={onCloseModal}
        />
      </Modal>

      {formDataFromModal.map((offer, index) => (
        <div key={index} className="w-[450px] h-[145px] rounded-[7px] bg-white">
          <div className="w-[450px] h-[50px] bg-[#8FCEDD] rounded-t-[7px] flex items-center justify-center">
            <h2 className="text-white text-[17px] font-[600]">{offer.title}</h2>
          </div>
          <div className="flex w-full px-4 py-[17px] gap-2  items-center  ">
            <img src={radio} alt="radio" className="w-[12x] h-[12px]" />
            <p className="text-[15px]  w-[350px]">{offer.message}</p>
            <p className="text-[12px] text-[#4A55A2] ml-[20px] font-[500]  w-[250px]">
              {offer.from} - {offer.to}
            </p>
            <img
              src={info}
              alt="right"
              className="w-[15px] h-[18px]"
              onClick={() => openModal(offer)}
            />
          </div>
          <div className="flex px-4 items-center justify-between">
            <p className="text-[13.2px] text-[#6A5F5F]">{offer.description}</p>

            <div className="flex px-4 items-center justify-end gap-3 pr-5">
              <p className="text-[13.2px] text-[#6A5F5F]">20 views</p>
              <div className="flex gap-1">
                <img src={edit} alt="edit" className="w-[15px] h-[15px]" />
                <img src={trash} alt="trash" className="w-[14px] h-[16px]" />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {formDataFromModal !== null ? (
        formDataFromModal.map((offer, index) => (
          <div
            key={index}
            className="w-[450px] h-[145px] rounded-[7px] bg-white"
          >
            <div className="w-[450px] h-[50px] bg-[#8FCEDD] rounded-t-[7px] flex items-center justify-center">
              <h2 className="text-white text-[17px] font-[600]">
                {offer.title}
              </h2>
            </div>
            <div className="flex w-full px-4 py-[17px] gap-4 items-center ">
              <img src={radio} alt="radio" className="w-[12x] h-[12px]" />
              <p className="text-[16px]">{offer.message}</p>
              <p className="text-[14px] text-[#4A55A2] ml-[50px] font-[500]">
                {offer.from} - {offer.to}
              </p>
              <img
                src={info}
                alt="right"
                className="w-[15px] h-[18px]"
                onClick={() => openModal(offer)}
              />
            </div>
            <div className="flex px-4 items-center justify-between">
              <p className="text-[13.2px] text-[#6A5F5F]">
                {offer.description}
              </p>

              <div className="flex px-4 items-center justify-end gap-3 pr-5">
                <p className="text-[13.2px] text-[#6A5F5F]">20 views</p>
                <div className="flex gap-1">
                  <img src={edit} alt="edit" className="w-[15px] h-[15px]" />
                  <img src={trash} alt="trash" className="w-[14px] h-[16px]" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No offers to display.</p>
      )} */}
    </div>
  );
};

export default Offers;