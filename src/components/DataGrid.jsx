import React, { useState, useEffect } from "react";
import { useSpaceXData } from "../context/SpacexContext";
import CapsuleCard from "./CapsuleCard";
import SearchForm from "./SearchForm";

export default function CapsulesGrid() {
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const { capsules, loading, error } = useSpaceXData();
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    status: "",
    originalLaunch: "",
    type: "",
  });

  useEffect(() => {
    setFilteredCapsules(capsules);
  }, [capsules]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < capsules.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCapsuleClick = (capsule) => {
    setSelectedCapsule(capsule);
  };

  const handleClosePopup = () => {
    setSelectedCapsule(null);
  };

  const filterCapsules = (filters) => {
    setSearchFilters(filters);
  };

  const applyFilters = (capsulesToFilter) => {
    const { status, originalLaunch, type } = searchFilters;

    return capsulesToFilter.filter((capsule) => {
      const {
        status: capsuleStatus,
        original_launch_unix,
        type: capsuleType,
      } = capsule;

      const matchesStatus =
        status === "" ||
        capsuleStatus.toLowerCase().includes(status.toLowerCase());
      const matchesOriginalLaunch =
        originalLaunch === "" ||
        new Date(original_launch_unix * 1000)
          .toLocaleDateString()
          .includes(originalLaunch);
      const matchesType =
        type === "" || capsuleType.toLowerCase().includes(type.toLowerCase());

      return matchesStatus && matchesOriginalLaunch && matchesType;
    });
  };

  const filteredData = applyFilters(filteredCapsules);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedCapsules = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <SearchForm onSearch={filterCapsules} />
      <div
        className={`grid px-2 mt-8 lg:grid-cols-${
          displayedCapsules.length > 0 ? 3 : 1
        } gap-4`}
      >
        {displayedCapsules.length > 0 ? (
          displayedCapsules.map((capsule) => (
            <div key={capsule.capsule_serial}>
              {capsule ? (
                <div className="max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Serial: {capsule.capsule_serial}
                  </h5>
                  <p className="mb-1 font-normal text-white dark:text-gray-200">
                    Details:{" "}
                    <span className="text-gray-400">{capsule.details}</span>
                  </p>
                  {capsule.original_launch && (
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-200">
                      Launch Date:{" "}
                      <span className="text-gray-400">
                        {capsule.original_launch}
                      </span>
                    </p>
                  )}
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-200">
                    Status:{" "}
                    <span className="text-gray-400">{capsule.status}</span>
                  </p>
                  <button
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black rounded-lg dark:bg-white dark:hover:bg-grey-700 dark:focus:ring-grey-800 cursor-pointer"
                    onClick={() => handleCapsuleClick(capsule)}
                  >
                    Read more
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p className="text-2xl py-6 font-bold text-center tracking-tight text-gray-900">
            Data is not found!
          </p>
        )}
      </div>

      <div
        className={`flex justify-center ${
          displayedCapsules.length > 0 ? "" : "pointer-events-none opacity-50"
        } mb-4 mt-4`}
      >
        <button
          onClick={handlePrevPage}
          className={`mx-2 px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-700"
              : "bg-black text-white"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from(
          { length: Math.ceil(capsules.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-gray-700 hover:text-white transition duration-300`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          onClick={handleNextPage}
          className={`mx-2 px-3 py-1 rounded-md disabled:opacity-50 ${
            endIndex >= capsules.length
              ? "bg-gray-200 text-gray-700"
              : "bg-black text-white"
          }`}
          disabled={endIndex >= capsules.length}
        >
          Next
        </button>
      </div>
      {selectedCapsule && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-1 mx-2 rounded-md shadow-lg">
            <CapsuleCard
              capsule={selectedCapsule}
              handleClosePopup={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}
