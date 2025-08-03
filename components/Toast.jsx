import React, { useState, useEffect } from 'react';

const Toast = ({ title, variant = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the toast after mounting
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto-hide after 3 seconds
    const hideTimer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  const successIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM14.0711 7.29289C14.4616 6.90237 15.0948 6.90237 15.4853 7.29289C15.8758 7.68342 15.8758 8.31658 15.4853 8.70711L9.57107 14.6213C9.18055 15.0118 8.54738 15.0118 8.15686 14.6213L4.51472 10.9792C4.1242 10.5886 4.1242 9.95543 4.51472 9.5649C4.90525 9.17438 5.53841 9.17438 5.92893 9.5649L8.86396 12.4999L14.0711 7.29289Z"
        fill="#25BA3B"
      />
    </svg>
  );

  const errorIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z"
        fill="#F25A5A"
      />
    </svg>
  );

  return (
    <div className={`toast toast--${variant} ${isVisible ? 'is-visible' : ''}`}>
      <div className="toast__icon-wrapper">
        {variant === 'success' && successIcon}
        {variant === 'error' && errorIcon}
      </div>
      <div className="toast__message">{title}</div>
      <button 
        className="toast__close-button"
        onClick={handleClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;