import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
    };

    return (
        <ToastContainer {...options} />
    );
};

export const showToast = (message, type, options = {}) => {
    toast[type](message, options);
};

export default Toast;