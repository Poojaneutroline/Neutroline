import React, { useState } from "react";
// import AddService from "./AddService";
import ViewService from "./ViewService";
import edit from "../assets/edit.png";
import view from "../assets/icons-view.png";
import trash from "../assets/icons-trash.png";
import Modal from "react-responsive-modal";
import AddService from "./AddService";
import AddNewService from "./AddNewService";
import "./service.css";

const Service = () => {
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
      servicename: "Basic abcde Counselling",
      availability: "M T W",
      duration: "30 Min",
      visibility: false,
      action: "hi",
    },
    {
      id: 2,

      servicename: "Basic  Counselling",
      availability: "M T W",
      duration: "30 Min",
      visibility: false,
      action: "hi",
    },
    {
      id: 3,

      servicename: "Basic  Counselling",
      availability: "M T W",
      duration: "30 Min",
      visibility: false,
      action: "hi",
    },
    {
      id: 4,

      servicename: "Basic  Counselling",
      availability: "M T W",
      duration: "30 Min",
      visibility: false,
      action: "hi",
    },
    // Add more data objects here as needed
  ]);

  const getAvailabilityDays = (availability) => {
    return availability.trim().split(""); // Split the availability string into individual characters
  };

  const getDayLabel = (day) => {
    // Define a mapping between characters and their corresponding labels
    const dayLabels = {
      Monday: "M",
      Tuesday: "T",
      Wednesday: "W",
      // Add more day labels here as needed
    };
    return dayLabels[day] || day; // If a label exists, return the label; otherwise, return the original character
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const [selectedService, setSelectedService] = useState(null);

  const viewDetails = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const [addModal, setAddModal] = useState(false);
  const openAddModal = () => {
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
  };
  const handleDelete = (itemId) => {
    // Filter out the item with the matching id from the data array
    const updatedData = data.filter((item) => item.id !== itemId);

    // Update the data array with the updatedData
    setData(updatedData);
  };
  

  return (
    <div>
      <Modal
        open={addModal}
        onClose={closeAddModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <AddNewService
          setData={setData}
          data={data}
          setOpenModal={openAddModal}
          onCloseModal={closeAddModal}
          handleToggle={handleToggle}
        />
      </Modal>

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
        {selectedService && (
          <ViewService service={selectedService} onCloseModal={onCloseModal} />
        )}
      </Modal>
      <div className="flex justify-between items-end">
        <h1 className="text-[22px] text-[#0C1A97]  mb-[-5px]">
          All Services
        </h1>
        <button
          className="bg-[#f8f8f8] px-[11px] py-[8px] text-[#5B76FC] font-[600] shadow-md rounded-[4px] mr-1"
          onClick={openAddModal}
        >
          + Add Services
        </button>
      </div>
      <div className=" flex justify-center mt-[8px] rounded-[10px]">
        <div className="max-h-[250px] overflow-y-auto rounded-[10px]">
          <table className="table-auto border rounded-md">
            <thead className="border rounded-[100px] sticky top-0 z-10">
              <tr className="h-[50px]  text-[15px] bg-[#d6e0fa] rounded-[10px] ">
                <th className=" font-man font-medium md:w-[50px] ">ID</th>
                <th className=" font-man font-medium md:w-[220px]">
                  Service Name
                </th>
                <th className=" font-man font-medium md:w-[200px]">
                  Availability
                </th>
                <th className="font-man font-medium md:w-[150px]">Duration</th>
                <th className="font-man font-medium md:w-[130px]">
                  Visibility
                </th>
                <th className="font-man font-medium md:w-[200px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border h-[40px] bg-[#f4f2f2]">
                  <td className=" text-center">{item.id}</td>
                  <td className="text-center">{item.servicename}</td>
                  <td className="text-center flex items-center justify-center gap-[3px]">
                    {getAvailabilityDays(item.availability).map(
                      (day, index) =>
                        day.trim() !== "" && (
                          <button
                            key={index}
                            className=" flex w-[30px] h-[32px] p-[7px 9px 7px 9px] justify-center items-center border  bg-[#FEFEFF] text-[#5B76FC]  rounded-lg cursor-default "
                          >
                            {getDayLabel(day)}
                          </button>
                        )
                    )}
                  </td>

                  <td className=" text-center text-[#00AA3A]">
                    {item.duration}
                  </td>
                  <td className="flex items-center justify-evenly  h-[59px]  ">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        {/* Hidden input to hold the toggle state */}
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={item.checked}
                          onChange={() => handleToggle(item.id)} // Use onChange instead of onClick
                        />
                        {/* Track (background) */}
                        <div
                          className={`w-[35px] h-[16px] rounded-full shadow-inner ${
                            item.checked ? "bg-[#08A0E9]" : " bg-gray-300"
                          }`}
                        ></div>
                        {/* Thumb (circle) */}
                        <div
                          className={`absolute top-0 left-0 w-[16px] h-[16px] bg-white rounded-full shadow transform transition-transform ${
                            item.checked ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></div>
                      </div>
                    </label>
                  </td>

                  <td className="  text-center ">
                    <div className="flex gap-2 items-center justify-center w-[200px]  ">
                      <img src={edit} className="w-5" alt="yellow"></img>

                      <button onClick={() => viewDetails(item)}>
                        <img src={view} className="w-5" alt="yellow"></img>
                      </button>
                      <img src={trash} className="w-5" alt="yellow" 
                      onClick={() => handleDelete(item.id)} 
                      // Call the handleDelete function on click
                      >
                      </img>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default Service;
