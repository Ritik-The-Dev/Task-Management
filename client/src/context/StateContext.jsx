import { createContext, useContext, useReducer } from "react";

// Create a context for managing state
export const StateContext = createContext();

// State provider component to wrap the application and manage state
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Custom hook to access the state and dispatch function
export const useStateProvider = () => useContext(StateContext);

// Enumerated cases for reducer actions
export const reducerCases = {
  SET_USER_INFO: "SET_USER_INFO",
  SET_USER_TASK: "SET_USER_TASK",
};
