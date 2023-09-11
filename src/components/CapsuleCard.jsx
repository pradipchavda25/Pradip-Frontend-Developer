import React from "react";
import PropTypes from "prop-types";

export default function CapsuleCard({ capsule, handleClosePopup }) {
  const {
    capsule_serial,
    status,
    original_launch_unix,
    missions,
    landings,
    type,
    details,
    reuse_count,
  } = capsule;

  const formattedLaunchDate = new Date(
    original_launch_unix * 1000
  ).toLocaleDateString();

  return (
    <>
      <div className="bg-white p-4 rounded-md dark:bg-black shadow-md">
        <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {capsule_serial} Capsule Details
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
            onClick={handleClosePopup}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <h3 className="text-lg mt-2 text-white font-semibold mb-2">
          Capsule Serial: {capsule_serial}
        </h3>
        <p className="text-white">
          Status: <span className="text-gray-400">{status}</span>
        </p>
        <p className="text-white">
          Original Launch Date:{" "}
          <span className="text-gray-400">{formattedLaunchDate}</span>
        </p>
        <p className="text-white">Missions:</p>
        <ul>
          {missions.map((mission) => (
            <li key={mission.name} className="text-gray-400">
              <span className="text-gray-400">
                {mission.name} (Flight: {mission.flight})
              </span>
            </li>
          ))}
        </ul>
        <p className="text-white">
          Landings: <span className="text-gray-400">{landings}</span>{" "}
        </p>
        <p className="text-white">
          Type: <span className="text-gray-400">{type}</span>{" "}
        </p>
        <p className="text-white">
          Details: <span className="text-gray-400">{details}</span>
        </p>
        <p className="text-white">
          Reuse Count: <span className="text-gray-400">{reuse_count}</span>{" "}
        </p>
      </div>
    </>
  );
}

CapsuleCard.propTypes = {
  capsule: PropTypes.object.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
};