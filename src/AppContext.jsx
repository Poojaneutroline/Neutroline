import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [formDataFromModal, setFormDataFromModal] = useState([]);
  const [serviceDataFromModal, setServiceDataFromModal] = useState([]);
  const [businessDataFromModal, setBusinessDataFromModal]=useState([]);
  const [hello, setHello] = useState(false);

  useEffect(() => {
    console.log(formDataFromModal);
  }, [hello]);

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        formDataFromModal,
        setFormDataFromModal,
        serviceDataFromModal,
        setServiceDataFromModal,
        businessDataFromModal,
        setBusinessDataFromModal,
        hello,
        setHello,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
