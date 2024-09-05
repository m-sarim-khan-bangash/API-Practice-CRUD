import React from 'react';
import Button from '../Button';
import Input from '../Input';

const Modal = ({ step, closeModal, nextStep, prevStep, handleChange, formData, save }) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>Enter your email</h2>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Enter your OTP</h2>
            <Input
              type="text"
              placeholder="OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Enter new password</h2>
            <Input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        {renderStep()}
        <div className="buttons">
          {step > 1 && <Button onClick={prevStep}>Previous</Button>}
          {step < 3 && <Button onClick={nextStep}>Next</Button>}
          {step == 3 && <Button onClick={save}>Save</Button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
