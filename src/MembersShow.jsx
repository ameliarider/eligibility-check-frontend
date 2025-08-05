import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function MembersShow() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [eligibilityChecks, setEligibilityChecks] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`members/${id}.json`).then((response) => {
      setMember(response.data);
    });
    axios.get("/eligibility_checks.json").then((response) => {
      setEligibilityChecks(response.data);
    });
  }, [id]);

  if (!member) return <div className="text-center my-5">Loading...</div>;

  const handleEligibilityCheck = () => {
    axios.post("/verify.json", { 
      external_member_id: member.external_member_id,
      first_name: member.first_name,
      last_name: member.last_name,
      dob: member.dob,
      zip: member.zip,
      group_number: member.group_number
     })
      .then(() => {
        axios.get(`members/${id}.json`).then((response) => {
          setMember(response.data);
        });
        axios.get("/eligibility_checks.json").then((response) => {
          setEligibilityChecks(response.data);
        });
      })
      .catch((error) => {
        console.error("Eligibility check failed:", error);
      });
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">
            {member.first_name} {member.last_name}
            {" "}
            {member.active ? (
              <span className="badge bg-success">Active</span>
            ) : (
              <span className="badge bg-secondary">Terminated</span>
            )}
          </h2>
          <p><strong>Date of Birth:</strong> {member.dob}</p>
          <p><strong>External Member ID:</strong> {member.external_member_id}</p>
          <p><strong>Zip:</strong> {member.zip}</p>
          <p><strong>Group Number:</strong> {member.group_number}</p>
          {member.terminated_at && <p><strong>Terminated At:</strong> {member.terminated_at}</p>}

          <div className="d-flex flex-wrap gap-2 my-4">
            <button onClick={handleEligibilityCheck} className="btn btn-warning">
              Re-check Coverage
            </button>
            <button
              onClick={() => navigate("/eligibilitycheck", { state: { member } })}
              className="btn btn-outline-warning"
            >
              Check Coverage with New Info
            </button>
            <button
              onClick={() => navigate("/members")}
              className="btn btn-secondary"
            >
              Back to All Members
            </button>
          </div>

          <hr />
          <h4>Coverage Checks</h4>
          {eligibilityChecks.filter(check => check.member_id === member.id).length === 0 ? (
            <p>No checks yet.</p>
          ) : (
            eligibilityChecks
              .filter(check => check.member_id === member.id)
              .map((check) => (
                <div key={check.id} className="border rounded p-2 my-2">
                  <p className="mb-0">
                    <strong>Date:</strong> {new Date(check.created_at).toLocaleString()}
                    {" | "}
                    <strong>Status:</strong>{" "}
                    {check.active ? (
                      <span className="text-success">Active</span>
                    ) : (
                      <span className="text-danger">Inactive</span>
                    )}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
