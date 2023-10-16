import { useContext } from "react";
import { AuthUpdateContext } from "../context/AuthContext";

const useAuthUpdateContext = () => {
  return useContext(AuthUpdateContext);
};

export default useAuthUpdateContext;
