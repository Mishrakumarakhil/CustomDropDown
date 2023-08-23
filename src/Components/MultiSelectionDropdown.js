import React, { useState } from "react";
import { countryList } from "../utils";

const MultiSelectionDropdown = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState(countryList);
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("asc");
  const [multiTextVal, setMultiTextVal] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setMultiTextVal(inputValue);
    setIsOpen(true);
    const filteredOptions = countryList.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelectOption = (option) => {
    let updatedSelected;
    if (selectedOption.includes(option.label)) {
      updatedSelected = selectedOption.filter((ele) => ele !== option.label);
    } else {
      updatedSelected = [...selectedOption, option.label];
    }

    setSelectedOption(updatedSelected);
    setFilteredOptions(countryList);
    setIsOpen(false);
    setMultiTextVal("");
  };

  const handleRemoveOption = (option) => {
    let options = option[0] ? option[0] : option;
    const updatedOptions = selectedOption.filter(
      (selected) => selected !== options.label
    );
    setSelectedOption(updatedOptions);
  };

  const handleSorting = () => {
    const sortedData = [...filteredOptions];
    if (sortBy === "asc") {
      sortedData.sort((a, b) => a.label.localeCompare(b.label));
      setSortBy("desc");
    } else {
      sortedData.sort((a, b) => b.label.localeCompare(a.label));
      setSortBy("asc");
    }
    setFilteredOptions(sortedData);
  };

  const renderSelectedOptions = () => {
    const visibleOptions = selectedOption.slice(0, 2);
    const remainingOptionsCount = selectedOption.length - 2;
    return (
      <div className="selected-options">
        {visibleOptions.map((selected, index) => (
          <span key={index} className="selected-option-label">
            {selected}{" "}
            <span
              onClick={() =>
                handleRemoveOption(
                  countryList.filter((option) =>
                    option.label.toLowerCase().includes(selected.toLowerCase())
                  )
                )
              }
              className="remove-option"
            >
              &#10006;
            </span>
          </span>
        ))}
        {remainingOptionsCount > 0 && (
          <span className="more-options" onClick={() => setIsOpen(!isOpen)}>
            +{remainingOptionsCount} more
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="single-selection-dropdown">
      <div className="header">MultiSelectionDropdown</div>
      <div className="input-box-container">
        {renderSelectedOptions()}
        <input
          type="text"
          value={multiTextVal}
          placeholder={selectedOption.length === 0 ? "Select an option" : ""}
          onClick={() => setIsOpen(!isOpen)}
          onChange={handleInputChange}
          className="custom-input"
        />

        <span
          role="img"
          aria-label="Search Icon"
          className="search-icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "🔍" : "▼"}
        </span>
        {isOpen && (
          <span
            className="sorting-icon"
            title="Sorting"
            onClick={handleSorting}
          >
            ⇅
          </span>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-list-container">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(option)}
                className={`dropdown-list-label${
                  selectedOption.includes(option.label)
                    ? " selected-option"
                    : ""
                }`}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectionDropdown;
