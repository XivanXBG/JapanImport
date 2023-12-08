import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export const toastStyles = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  style: {
    backgroundColor: "red",
    color: "white",
    top: "150px"
  },
};
