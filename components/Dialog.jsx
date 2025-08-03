import React, { useState, useEffect, useRef } from 'react';

const Dialog = ({ 
  isOpen, 
  onClose, 
  title = "Dialog", 
  closable = true, 
  width = "400px",
  children,
  footer
}) => {
  const dialogRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Focus trap and modal behavior
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    } else {
      setIsVisible(false);
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      if (onClose) onClose();
    };

    const handleClick = (e) => {
      if (closable && e.target === dialog) {
        handleClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && closable) {
        handleClose();
      }
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closable, onClose]);

  const handleCloseClick = () => {
    if (onClose) onClose();
  };

  return (
    <dialog 
      ref={dialogRef}
      className="dialog"
      style={{ '--dynamic-dialog-width': width }}
    >
      <div className="dialog-header">
        <div className="dialog-title">{title}</div>
        {closable && (
          <button
            type="button"
            className="dialog-close-button"
            onClick={handleCloseClick}
            aria-label="Close dialog"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="dialog-body">
        {children}
      </div>
      
      {footer && (
        <div className="dialog-footer">
          {footer}
        </div>
      )}
    </dialog>
  );
};

export default Dialog;