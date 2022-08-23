import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Provider is the actual component, a functional component,
// we need to return <UserContext.Provider, for every context
// we build there is a Provider which is the component that
// will wrap any other component that needs access to the value
// inside.
// We here render the children

/**
 * <UserProvider>
 *      <app />  -> the children
 * </UserProvider>
 */
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("user", user);
    });

    // with useEffect with this call back will run whatever we
    // return will run when the component unmounts.
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
