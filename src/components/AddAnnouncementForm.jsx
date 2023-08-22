import React from 'react'

const AddAnnouncementForm = () => {
  return (
    <div>
       <>
      {/* <Modal
        open={modalOpen}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <Calendar onSelectDate={handleSelectedDate} />
      </Modal>
      <Modal
        open={fromModalOpen}
        onClose={onFromCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
          closeButton: "customButton",
        }}
      >
        <Calendar onSelectDate={handleFromSelectedDate} />
      </Modal> */}
      <div>
        <form
          // onSubmit={handleSubmit}
          className=" flex md:w-[400px] md:h-[auto] mt-4  flex-col bg-[#ffffff] rounded-[10px] "
        >
          <h1 className="text-center  text-[22px] font-[600] md:py-4">
            Add Announcement
          </h1>
          <div className="flex items-center relative mx-3">
            {/* <img className="w-3.5  absolute left-4" src={user} alt="user"></img> */}
            <input
              className={`w-full rounded-[5px]  text-[14px] h-[39px] m-2 pl-[20px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d]   placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[15px] md:pl-[20px]`}
              type="text"
              name="title"
              // value={formData.title}
              // onChange={handleChange}
              placeholder="Title"
              required
            />
            {/* {formErrors.title && (
          <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
            {formErrors.title}*
          </p>
        )} */}
          </div>
          <div className="flex  items-center relative mx-3">
            {/* <img className="w-4 absolute left-4" src={mail} alt="mail"></img> */}
            <input
              className={`w-full  rounded-[5px]  text-[14px] h-[39px] m-2 pl-[26px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d]   placeholder:text-[13px]  md:w-[400px] md:h-[45px] md:placeholder:text-[15px] md:pl-[20px]`}
              type="text"
              name="message"
              // value={formData.message}
              // onChange={handleChange}
              placeholder="Message"
              required
            />
            {/* {formErrors.message && (
          <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
            {formErrors.message}*
          </p>
        )} */}
          </div>
          <div className="flex items-center relative mx-3">
            {/* <img
          className="w-4 h-4 absolute left-4"
          src={phone}
          alt="phone"
        ></img> */}
            <textarea
              className={`w-full rounded-[5px] md:p-2 text-[14px] h-[39px] m-2 pl-[26px] border-[0.5px]   focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  placeholder:text-[#8B8989] bg-[#dceaff4d] shadow-shado2  placeholder:text-[13px]  md:w-[400px] md:h-auto md:placeholder:text-[15px] md:pl-[20px] resize-none`}
              rows={4}
              name="description"
              placeholder="Description"
              // value={formData.description}
              // onChange={handleChange}
              required
            />
            {/* {formErrors.description && (
          <p className="text-red-500  absolute right-2 text-[12px] mx-3 ">
            {formErrors.description}*
          </p>
        )} */}
          </div>

          {/* <div className="  mx-3 flex  flex-col md:justify-between md:items-center md:gap-2 md:flex-row  ">
          <div className=" relative w-[100px] md:w-auto ">
              <img
            className=" hidden md:block  md:w-4 left-2 absolute md:left-4 top-[1.40rem]"
            src={time}
            alt="time"
          ></img>
              <button
                type="button"
                // onClick={fromOpenModal}
                name="from"
                className="  text-[14px]  h-[39px]  w-full rounded-[5px]  text-[#8B8989]  m-2  border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[170px] md:h-[45px]  md:text-[15px] "
              >
                {formData.from === "" ? <p>From</p> : <p>{formData.from}</p>}
              </button>

             
              {formErrors.from && (
            <p className="text-red-500 text-[12px] mx-3 ">
              {formErrors.from}*
            </p>
          )}
            </div>
            <div className=" relative w-[100px] md:w-auto ">
         

          <button
            type="button"
            className="  text-[14px] h-[39px]  w-full rounded-[5px]  text-[#8B8989]  m-2  border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[140px] md:h-[45px] md:text-[15px]   "
          >
            Select Time
          </button>
        </div>
            <div className=" relative w-[100px] md:w-auto ">
              <img
            className=" hidden md:block  md:w-4 left-2 absolute md:left-4 top-[1.40rem]"
            src={time}
            alt="time"
          ></img>
              <button
                type="button"
                // onClick={openModal}
                name="to"
                className="  text-[14px]  h-[39px]  w-full rounded-[5px]  text-[#8B8989]  m-2  border-[0.5px]  focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500  bg-[#dceaff4d] shadow-shado2   md:w-[170px] md:h-[45px]  md:text-[15px] "
              >
                {formData.to === "" ? <p>To</p> : <p>{formData.to}</p>}
              </button>

              {formErrors.to && (
            <p className={`text-red-500 text-[12px] mx-3`}>
              {formErrors.to}*
            </p>
          )}
            </div>
            
          </div> */}
          {/* <div
        className={` text-center mt-2 ${
          (formData.time && formData.date) === "" ? "hidden" : null
        } `}
      >
        <p>
          Appointment is set to {formData.time}, {formData.date}
        </p>
      </div> */}
          <div className="flex justify-center items-center mt-5 mb-5">
            <button
              type="submit"
              // onClick={handleSubmit}
              className="bg-[#0AA1DD] text-[white] font-[600] font-inter p-4 rounded-[5px] flex justify-center  items-center text-[14px] h-[39px] "
              style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
      
    </div>
  )
}

export default AddAnnouncementForm
