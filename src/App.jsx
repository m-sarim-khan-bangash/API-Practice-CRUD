// import React, { useState } from "react";
// import "./App.css";
// import Button from "./components/Button";
// import Input from "./components/Input";
// import Modal from "./components/Modal";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const openModal = () => {
//     setIsModalOpen(true);
//     setStep(1);
//     setFormData({ email: "", otp: "", newPassword: "", confirmPassword: "" });
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const save = () => {
//     if (
//       email === "" ||
//       otp === "" ||
//       newPassword === "" ||
//       confirmPassword === ""
//     ) {
//       alert("Please fill all the fields");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       alert("Password and Confirm Password should be same");
//       return;
//     } else {
//       alert("Password changed successfully");
//       closeModal();
//     }
//   };

//   const nextStep = () => {
//     setFormData((prevFormData) => {
//       switch (step) {
//         case 1:
//           return { ...prevFormData, email: "" };
//         case 2:
//           return { ...prevFormData, otp: "" };
//         case 3:
//           return { ...prevFormData, newPassword: "", confirmPassword: "" };
//         default:
//           return prevFormData;
//       }
//     });
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="App">
//       <h1>Login Page</h1>
//       <form>
//         <Input type="text" placeholder="Username" />
//         <Input type="password" placeholder="Password" />
//         <Button>Login</Button>
//       </form>
//       <Button onClick={openModal}>Forgot Password</Button>

//       {isModalOpen && (
//         <Modal
//           step={step}
//           closeModal={closeModal}
//           nextStep={nextStep}
//           prevStep={prevStep}
//           handleChange={handleChange}
//           formData={formData}
//           save={save}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CardList from './CardList';
// import CardDetail from './CardDetail';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CardList />} />
//         <Route path="cards/:id" element={<CardDetail />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalComponent from "./ModalComponent";

const App = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(response.data.slice(0, 10));
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch data from API
  useEffect(() => {
    getData()
  }, []);

  const openModal = (item = null) => {
    setEditData(item);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const updateData = (newData) => {
    if (editData) {
      setData(data.map((item) => (item.id === newData.id ? newData : item)));
    } else {
      setData([newData, ...data]);
    }
    closeModal();
  };

  return (
    <div className="container">
      <h1>Post List</h1>
      <button className="btn btn-primary" onClick={() => openModal()}>
        Add Post
      </button>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => openModal(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <ModalComponent
          show={modalOpen}
          handleClose={closeModal}
          data={editData}
          updateData={updateData}
        />
      )}
    </div>
  );
};

export default App;
