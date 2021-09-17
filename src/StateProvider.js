import React, { createContext, useContext, useReducer } from "react";

//Prepares the data layer
export const StateContext = createContext();

// wrap the app and provides the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull the information from data layer
export const useStateValue = () => useContext(StateContext);

//remember to wrap the index.js with the ststeProvider as well!
//ut gives access to every component
