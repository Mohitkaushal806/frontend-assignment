import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, selectedValues, onClick, onAddOption, isMulti, removeSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

  const dropdownRef = useRef();

  // Handle Dropdown Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {
          <div className="selected-options-container">
            {
              (selectedValues.length > 0 && selectedValues.map((val, index) => (
                <div className="selected-option">
                  <p>
                    {val}
                  </p>
                  <span style={{fontSize: '10px'}} onClick={(e) => {
                    e.stopPropagation();
                    removeSelected(val, isMulti)
                    }}>
                    &#x274c;
                  </span>
                </div>
              ))) || 'Select options'
            }
          </div>
        }
        <span className="dropdown-arrow">&#9662;</span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div key={index} className="dropdown-item" onClick={() => {
                onClick(option, isMulti)
                if(!isMulti) setIsOpen(false)
              }}>
              {option}
            </div>
          ))}
          <div className="dropdown-footer">
            <input type="text" value={newValue} name="newValue" onInput={(_) => setNewValue(_.target.value)}/>
            <button
              className="dropdown-add-button"
              onClick={(e) => {
                e.stopPropagation();
                if(newValue && newValue.trim() != "") {
                  onAddOption(newValue, isMulti);
                  setNewValue("");
                } else {
                  alert("Please enter value")
                }
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;