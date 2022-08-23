import React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Button = ({ type, loading, text, Icon, loadingText='Loading...', extraClasses, iconStyle, onClick }) => (
  <button
    type={type}
    onClick={onClick}
    
    className={`group relative flex justify-center items-center py-3 px-3 text-sm font-semibold rounded ${extraClasses} focus:outline-none active:bg-blue-700`}
  >
    { loading ?
      <span className="flex items-center">
        {/* <FontAwesomeIcon icon={faCircleNotch} spin /> */}
        <span className="ml-0 sm:ml-2">{loadingText}</span>
      </span> 
    :
      <div className='flex items-center justify-center space-x-1'>
        <span className={iconStyle}>
            { Icon }
        </span>
        <span> {text} </span>
      </div>
    }
  </button>
);

export default Button;
