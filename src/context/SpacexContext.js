
import React from 'react';
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useReducer } from "react";

const SpaceXContext = createContext();

const initialState = {
  capsules: [],
  loading: true,
  error: null,
};

const actionTypes = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        capsules: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_FAILURE:
      return {
        ...state,
        capsules: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const SpaceXProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v3/capsules")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_FAILURE, payload: error.message });
      });
  }, []);

  return (
    <SpaceXContext.Provider value={state}>{children}</SpaceXContext.Provider>
  );
};

const useSpaceXData = () => {
  const context = useContext(SpaceXContext);
  if (!context) {
    throw new Error("useSpaceXData must be used within a SpaceXProvider");
  }
  return context;
};

export { SpaceXProvider, useSpaceXData };

SpaceXProvider.propTypes = {
  children: PropTypes.node,
};