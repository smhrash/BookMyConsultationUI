import { createContext, useEffect, useReducer, useMemo } from "react";

export const AuthContext = createContext();

/**
 * Reducer function for the authentication context.
 *
 * @param {Object} state - The current state of the authentication context.
 * @param {Object} action - The action object that describes the state change.
 * @returns {Object} - The new state of the authentication context.
 */
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, userToken: action.payload };
    case "AUTH_IS_READY":
      return { ...state, userToken: action.payload, authIsReady: true };
    case "LOGOUT":
      return { ...state, userToken: null };
    default:
      return state;
  }
};

/**
 * Provides authentication context for the application.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} - The component with authentication context.
 */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    userToken: null,
    authIsReady: false,
  });

  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    dispatch({ type: "AUTH_IS_READY", payload: token });
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
