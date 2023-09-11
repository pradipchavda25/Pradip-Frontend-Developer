import React, { useState } from "react";
import PropTypes from "prop-types";

export default function SearchForm({ onSearch }) {
  const [filters, setFilters] = useState({
    status: "",
    originalLaunch: "",
    type: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Search Capsules</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="border rounded-md py-2 px-3 w-full"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="retired">Retired</option>
            <option value="destroyed">Destroyed</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            id="originalLaunch"
            name="originalLaunch"
            value={filters.originalLaunch}
            onChange={handleInputChange}
            placeholder="Original Launch Date"
            className="border rounded-md py-2 px-3 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            id="type"
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            placeholder="Capsule Type Ex. Dragon 1.0, Dragon 1.1 or Dragon 2.0"
            className="border rounded-md py-2 px-3 w-full"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-grey-800 transition duration-300 w-full"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};