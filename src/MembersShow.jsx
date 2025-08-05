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
      console.log(response.data);
      setMember(response.data);
    });
    axios.get("/eligibility_checks.json").then((response) => {
      console.log(response.data);
      setEligibilityChecks(response.data);
    })
  }, [id]);

  if (!member) return <div>Loading...</div>;

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
        // Re-fetch full member record from original endpoint
        axios.get(`members/${id}.json`).then((response) => {
          setMember(response.data);
        });
        axios.get("/eligibility_checks.json").then((response) => {
          console.log(response.data);
          setEligibilityChecks(response.data);
        })
      })
      .catch((error) => {
        console.error("Eligibility check failed:", error);
      });
  };


  return (
    <div>
      <h2>{member.first_name} {member.last_name}</h2>
      <p>DOB: {member.dob}</p>
      <p>External member id: {member.external_member_id}</p>
      <p>Zip: {member.zip}</p>
      <p>Group number: {member.group_number}</p>
      <p>Active: {member.active ? "Yes" : "No"}</p>
      <p>Terminated at: {member.terminated_at}</p>
      <button
        onClick={handleEligibilityCheck}
      >
        Check Coverage
      </button>
      <button onClick={() => navigate("/eligibilitycheck", { state: { member } })} >Check Coverage with New Member Info</button>
      <div>
        <h3>Coverage Checks</h3>
        {eligibilityChecks
        .filter((check) => check.member_id === member.id)
        .map((check) => (
          <div key={check.id}>
            <p><strong>Date:</strong> {check.created_at} Active: {check.active ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/members")}>Back to All Members</button>
    </div>

  )
}