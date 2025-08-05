export function HomePage() {
  return (
    <div>
      <h1>Guide to Eligibility Check App</h1>
      <ol>
        <li><strong>Required:</strong> Log in to the website to access member data. Contact administrator if you need login credentials.</li>
        <li><strong>For a new eligibility check:</strong> Navigate to the "eligibility checks" tab in the navbar.</li>
        <li>Enter member information to submit new check.</li>
        <li>Once checked, you will automatically be directed to the members page with their eligibility info and previous checks (if any exist).</li>
        <li><strong>For an existing member:</strong> Navigate to the "members tab in the navbar.</li>
        <li>Use the search bar to find the member by external member ID or scroll through members to find.</li>
        <li>To recheck coverage, click "re-check" button on their member information page.</li>
      </ol>
    </div>
  )
}