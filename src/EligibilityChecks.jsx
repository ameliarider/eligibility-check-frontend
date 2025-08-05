import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export function EligibilityChecks() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member || null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const params = new FormData(form);

    axios.post("verify.json", params)
    .then((response) => {
      console.log("Eligibility checked:", response.data);
      const id = response.data.id;
      console.log(id);
      form.reset();
      navigate(`/members/${id}`);
    })
    .catch((error) => {
      console.log(error.response.data.errors);
      setErrors(error.response.data.errors);
    });
  };
  
  return (
    <div>
      <h2>New Eligibility Search</h2>
      {errors.length > 0 && (
        <ul>
          {errors.map((e, i) => (
            <li key={i} style={{ color: "red" }}>{e}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          External Member ID (optional): <input
            type="text"
            name="external_member_id"
            placeholder="11111111"
            defaultValue={member?.external_member_id || ""}
          />
        </div>
        <div>
          First Name: <input
            type="text"
            name="first_name"
            placeholder="John"
            defaultValue={member?.first_name || ""}
          />
        </div>
        <div>
          Last Name: <input
            type="text"
            name="last_name"
            placeholder="Smith"
            defaultValue={member?.last_name || ""}
          />
        </div>
        <div>
          Date of Birth: <input
            type="text"
            name="dob"
            placeholder="1974-09-16"
            defaultValue={member?.dob || ""}
          />
        </div>
        <div>
          Zip Code: <input
            type="text"
            name="zip"
            placeholder="99911"
            defaultValue={member?.zip || ""}
          />
        </div>
        <button type="submit">Check Coverage</button>
      </form>
    </div>
  )
}