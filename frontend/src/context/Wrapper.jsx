import { createContext } from "react";

export const greencartcontext = createContext(null);
const Wrapper = (props) => {
  
  return (
    <greencartcontext.Provider value={{}}>
      {props.children}
    </greencartcontext.Provider>
  );
}
export default Wrapper;