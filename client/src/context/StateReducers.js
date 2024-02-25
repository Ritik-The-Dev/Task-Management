import { reducerCases } from "./StateContext";

// Initial state for the application
export const initialState = {
  userInfo: undefined, // User information
  userTask: undefined, //Task information
};

// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO:
      // Save profile information to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
      return {
        ...state,
        userInfo: action.userInfo,
      };
      case reducerCases.SET_USER_TASK:
        // Save task information to localStorage
        localStorage.setItem('userTask', JSON.stringify(action.userTask));
        return {
          ...state,
          userTask: action.userTask,
        };
    default:
      return state;
  }
};

export default reducer;
