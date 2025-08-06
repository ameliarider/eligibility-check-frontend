import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export function EligibilityChecks() {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const member = location.state?.member || null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const params = new FormData(form);

    axios.post("verify.json", params)
      .then((response) => {
        const id = response.data.id;
        form.reset();
        navigate(`/members/${id}`);
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
        // console.log(error.response.data.errors);
      });
      console.log(errors);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">New Eligibility Search</h2>

      {errors && (
        <div className="alert alert-danger">
          <p className="mb-0">
            {errors}
          </p>
        </div>
      )}

      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">External Member ID (optional)</label>
              <input
                type="text"
                name="external_member_id"
                className="form-control"
                placeholder="11111111"
                defaultValue={member?.external_member_id || ""}
              />
            </div>
            <div className="mb-3">
              <label className="form-label required-field">First Name</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                placeholder="John"
                defaultValue={member?.first_name || ""}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label required-field">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                placeholder="Smith"
                defaultValue={member?.last_name || ""}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label required-field">Date of Birth</label>
              <input
                type="date"
                min="1900-01-01" max="2000-12-31"
                name="dob"
                className="form-control"
                placeholder="1974-09-16"
                defaultValue={member?.dob || ""}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label required-field">Zip Code</label>
              <input
                type="text"
                name="zip"
                className="form-control"
                placeholder="99911"
                defaultValue={member?.zip || ""}
                required
              />
            </div>
            <button type="submit" className="btn btn-warning w-100">Check Coverage</button>
          </form>
        </div>
      </div>
    </div>
  );
}
