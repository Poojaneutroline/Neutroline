import React, { useState, useContext, useEffect } from "react";
// import AddService from "./AddService";
import ViewService from "./ViewService";
import edit from "../assets/edit.png";
import view from "../assets/icons-view.png";
import trash from "../assets/icons-trash.png";
import Modal from "react-responsive-modal";
import AddService from "./AddService";
import AddNewService from "./AddNewService";
import { AppContext } from "../AppContext";

import "./service.css";

const Service = () => {
  const [checked, setChecked] = useState(false);
  const { serviceDataFromModal, setServiceDataFromModal } =
    useContext(AppContext);
    const {businessDataFromModal}=useContext(AppContext);
    const businessDaysFrom = businessDataFromModal.workHours?.businessDaysFrom ||"from";
    const businessDaysTo = businessDataFromModal.workHours?.businessDaysTo || "To";
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [addModal, setAddModal] = useState(false);

  const handleToggle = (itemId) => {
    // Find the item in the data array and update its checked state
    const updatedServiceData = serviceDataFromModal.map((item) => {
      if (item.id === itemId) {
        // Toggle the visibility property
        return { ...item, visibility: !item.visibility };
      }
      return item;
    });

    // Update the serviceDataFromModal array with the updatedServiceData
    setServiceDataFromModal(updatedServiceData);
  };
  const [data, setData] = useState([
    {
      id: "",
      servicename: "",
      availability: "",
      duration: "",
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

  const openModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const viewDetails = (service) => {
    // Include the day.visibility value in the selectedService object
  const selectedServiceWithVisibility = {
    ...service,
    visibility: service.weekdays.map((day) => day.visibility),
    description:serviceDataFromModal.description,
  };
    setSelectedService(service);
    setModalOpen(true);
  };

  const openAddModal = () => {
    setAddModal(true);
  };
  const closeAddModal = () => {
    setAddModal(false);
  };
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const handleDelete = (itemId) => {
    // Filter out the item with the matching id from the serviceDataFromModal array
   
    setServiceToDelete(itemId);
    setConfirmModalOpen(true);
  };
  const confirmDelete = () => {
    // Filter out the item with the matching id from the serviceDataFromModal array
    const updatedServiceData = serviceDataFromModal.filter(
      (item) => item.id !== serviceToDelete
    );
    setServiceDataFromModal(updatedServiceData);
    setConfirmModalOpen(false); // Close the confirmation modal after deletion
  };
  useEffect(() => {
    console.log(serviceDataFromModal);
  }, [serviceDataFromModal]);

  const [editServiceData, setEditServiceData] = useState(null);
  // Function to handle the "Edit" action
  const handleEdit = (service) => {
    setEditServiceData(service);
    setAddModal(true);
  };
  const handleAddNewService = () => {
    // Reset editServiceData when adding a new service
    setEditServiceData(null);
    setAddModal(true);
  };
  return (
    <div>
      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
 <div className="w-full sm:w-[450px]  bg-[white] rounded-[10px] h-full"> 
 <div className="w-full sm:w-[450px] sm:h-[60px] p-2  rounded-t-[10px] flex items-left justify-left">
 <h1 className="text-[18px] p-4">Are you sure want to delete this service?</h1>
 </div>
 <div className="flex pb-4 sm:pb-6   mt-[20px] gap-4 justify-end px-4  ">
        <button
          className="bg-[#6499E9] text-[white] font-[600] font-inter px-[15px] rounded-[5px] flex justify-center  items-center text-[16px] h-[36px]"
          onClick={confirmDelete}
        >
          Delete
        </button>
        <button
 className=" text-[#6499E9] font-[600] font-inter px-[15px] rounded-[5px] flex justify-center  items-center text-[16px] h-[36px] border-[1px] border-[#6499E9]"
 style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} 
          onClick={() => setConfirmModalOpen(false)}
        >
          Cancel
        </button>{" "}
      </div>
    </div>
    </Modal>
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
          setServiceDataFromModal={setServiceDataFromModal}
          setOpenModal={openAddModal}
          onCloseModal={closeAddModal}        />
      </Modal>
      {addModal && (
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
          setServiceDataFromModal={setServiceDataFromModal}
          setOpenModal={openAddModal}
          onCloseModal={closeAddModal}
          editService={editServiceData} // Pass the selected service data as the editService prop
          mode={editServiceData ? "edit" : "add"}
          data={editServiceData ? "update": "add"}
        />
      </Modal>
)}
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
        <h1 className="text-[22px] text-[#0C1A97]  mb-[-5px]">All Services</h1>
        <button
          className="bg-[#f8f8f8] px-[11px] py-[8px] text-[#5B76FC] font-[600] shadow-md rounded-[4px] mr-1"
          onClick={handleAddNewService} // Call handleAddNewService function when "Add New Service" button is clicked
        >
          + Add Services
        </button>
      </div>
      <div className=" flex justify-center mt-[8px] rounded-[10px]">
        <div className="max-h-[250px] overflow-y-auto rounded-[10px]">
          <table className="table-auto border rounded-md">
            <thead className="border rounded-[100px] sticky top-0 z-10">
              <tr className="h-[50px]  text-[15px] bg-[#d6e0fa] rounded-[10px] ">
                <th className="font-man font-medium md:w-[50px]">ID</th>
                <th className="font-man font-medium md:w-[220px]">
                  Service Name
                </th>
                <th className="font-man font-medium md:w-[200px]">
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
              {/* {data.map((item) => ( */}
              {Array.isArray(serviceDataFromModal) &&
              serviceDataFromModal.length > 0 ? (
                // {formDataFromModal !== null ? (
                serviceDataFromModal.map((offer, index) => (
                  <tr key={offer.id} className="border h-[40px] bg-[#f4f2f2]">
                    <td className=" text-center">{offer.id}</td>
                    <td className="text-center">{offer.servicename}</td>
                    <td className="text-center flex items-center justify-center gap-[3px]">
                      {/* Render availability days */}
                      {offer.weekdays.map(
                        (day, dayIndex) =>
                          day.visibility && (
                            <button
                              key={dayIndex}
                              className="flex w-[30px] h-[32px] p-[7px 9px 7px 9px] justify-center items-center border bg-[#FEFEFF] text-[#5B76FC] rounded-lg cursor-default"
                            >
                              {day.name}
                            </button>
                          )
                      )}
                    </td>

                    <td className=" text-center text-[#00AA3A]">
                      {offer.duration}
                    </td>
                    <td className="flex items-center justify-evenly  h-[59px]  ">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          {/* Hidden input to hold the toggle state */}
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={offer.visibility}
                            onChange={() => handleToggle(offer.id)} // Use onChange instead of onClick
                          />
                          {/* Track (background) */}
                          <div
                            className={`w-[35px] h-[16px] rounded-full shadow-inner ${
                              offer.visibility ? "bg-[#08A0E9]" : " bg-gray-300"
                            }`}
                          ></div>
                          {/* Thumb (circle) */}
                          <div
                            className={`absolute top-0 left-0 w-[16px] h-[16px] bg-white rounded-full shadow transform transition-transform ${
                              offer.visibility
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          ></div>
                        </div>
                      </label>
                    </td>

                    <td className="text-center ">
                      <div className="flex gap-2 items-center justify-center w-[200px]  ">
                        <button onClick={() => handleEdit(offer)}>  
                        <img src={edit} className="w-5" alt="yellow"></img>
                        </button>
                        <button onClick={() => viewDetails(offer)}>
                          <img src={view} className="w-5" alt="yellow"></img>
                        </button>
                        <img
                          src={trash}
                          className="w-5"
                          alt="yellow"
                          onClick={() => handleDelete(offer.id)}
                          // Call the handleDelete function on click
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className=" py-1 px-4">
                    No service available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Service;
