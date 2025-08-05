import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LogoutLink({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    axios.delete("/logout.json").then((response) => {
      console.log(response);
      localStorage.removeItem("email");
      setIsLoggedIn(false); // Update the authentication state
      navigate("/"); // Navigate to photos page after logout
    });
  };

  return (
    <button onClick={handleClick}>
      Logout
    </button>
  );
}