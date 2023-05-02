import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const NonAvoidableModal = ({ showModal, children, className }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      {isBrowser && (
        <>
          {showModal &&
            createPortal(
              <>
                <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center">
                  <div className="wrapper fixed top-0 right-0 left-0 bottom-0 bg-indigo-200 z-20"></div>
                  <div className={`modal-container z-40 m-5 ${className}`}>
                    <div className="bg-white p-10 rounded-2xl space-y-5 flex flex-col items-center justify-center">
                      {children}
                    </div>
                  </div>
                </div>
              </>,
              document.getElementById("modal-root")
            )}
        </>
      )}
    </>
  );
};

export default NonAvoidableModal;
