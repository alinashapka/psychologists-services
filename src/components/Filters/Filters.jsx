import { useState } from "react";
import Icon from "../Icon/Icon";
import css from "./Filters.module.css";

function Filters({ activeFilter, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { value: "a-to-z", label: "A to Z" },
    { value: "z-to-a", label: "Z to A" },
    { value: "price-low-high", label: "Less than 10$" },
    { value: "price-high-low", label: "Greater than 10$" },
    { value: "popular-high-low", label: "Popular" },
    { value: "popular-low-high", label: "Not popular" },
    { value: "show-all", label: "Show all" },
  ];

  const currentFilterLabel = filterOptions.find(
    (option) => option.value === activeFilter
  )?.label;

  const handleFilterSelect = (value) => {
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div className={css.filterWrapper}>
      <p className={css.label}>Filters</p>

      <div className={css.dropdown} onClick={() => setIsOpen(!isOpen)}>
        <p className={css.currLabel}>{currentFilterLabel}</p>
        <button className={css.dropdownButton} type="button">
          <Icon
            id="arrow"
            size={20}
            className={isOpen ? css.iconRotated : css.icon}
          />
        </button>
      </div>

      {isOpen && (
        <div className={css.dropdownMenu}>
          {filterOptions.map((option) => (
            <div
              key={option.value}
              className={`${css.dropdownItem} ${
                activeFilter === option.value ? css.active : ""
              }`}
              onClick={() => handleFilterSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filters;
