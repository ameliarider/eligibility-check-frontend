import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function MembersIndex() {
  const [sort, setSort] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [ members, setMembers ] = useState([]);
  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("/members.json").then((response) => {
      console.log(response.data);
      setMembers(response.data);
    });
  };

  useEffect(handleIndex, []);

  return (
    <div>
        <h1>All members ({members.length} total)</h1>
        Filter by status: <select type="string" value={sort} onChange={(event) => setSort(event.target.value)} list="ids">
          <option value="">None</option>
          <option value="active">Active</option>
          <option value="terminated">Terminated</option>
        </select>
        <label>Search Members:</label><input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} /> <br /> 
       {members
        .filter((member) => {
          // Filter by status
          if (sort === "active" && !member.active) return false;
          if (sort === "terminated" && member.active) return false;

          // Filter by name (first or last)
          const fullName = `${member.first_name} ${member.last_name}`.toLowerCase();
          return fullName.includes(searchFilter.toLowerCase());
        })
        .map((member) => (
          <div key={member.id}>
            <h2>{member.first_name} {member.last_name} ({member.active ? "Active" : "Terminated"})</h2>
            <Link to={`/members/${member.id}`} className="btn btn-primary">
              Full Member Details
            </Link>
          </div>
        ))
      }
      </div>
  );
}