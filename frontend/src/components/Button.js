import React from 'react';

const Button = ({ onClick, children, className, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded-md font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
