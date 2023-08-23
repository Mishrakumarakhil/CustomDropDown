import React, { useCallback, useState } from "react";
import { countryList } from "../utils";

const SingleSelectionDropDown = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(countryList);
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("asc");

  const handleInputChange = useCallback((e) => {
    const inputValue = e.target.value;
    setSelectedOption(inputValue);

    const filtered = countryList.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, []);

  const handleSelectOption = useCallback((option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  }, []);

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
  return (
    <div className="single-selection-dropdown">
      <div className="header">SingleSelectionDropDown</div>
      <div className="input-box-container">
        <input
          type="text"
          value={selectedOption}
          placeholder="Select an option"
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
                  option.label === selectedOption ? " selected-option" : ""
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
export default SingleSelectionDropDown;
