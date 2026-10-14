import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // React Portal will only work on the client side
    setMounted(true);

    // set the state to false, when the Portal is unmounted from the UI
    return () => setMounted(false);
  }, []);

  return mounted // checking if it is a browser
    ? createPortal(children, document.getElementById("portal"))
    : null;
};

export default Portal;
