import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function MembersIndex() {
  const [sort, setSort] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [members, setMembers] = useState([]);

  const handleIndex = () => {
    axios.get("/members.json").then((response) => {
      setMembers(response.data);
    });
  };

  useEffect(handleIndex, []);

  const filteredMembers = members.filter((member) => {
    if (sort === "active" && !member.active) return false;
    if (sort === "terminated" && member.active) return false;

    const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
    return fullName.includes(searchFilter.toLowerCase());
  });

  return (
    <div className="container my-5">
      <h1 className="mb-4">All Members ({filteredMembers.length} total)</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Filter by status:</label>
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="active">Active</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
        <div className="col-md-8">
          <label className="form-label">Search by name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type first or last name"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <p>No matching members found.</p>
      ) : (
        <div className="row">
          {filteredMembers.map((member) => (
            <div className="col-md-6 mb-4" key={member.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">
                    {member.first_name} {member.last_name}
                    {" "}
                    {member.active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-secondary">Terminated</span>
                    )}
                  </h4>
                  <p className="card-text mb-3">
                    External Member ID: <strong>{member.external_member_id}</strong>
                  </p>
                  <Link to={`/members/${member.id}`} className="btn btn-warning">
                    Full Member Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
