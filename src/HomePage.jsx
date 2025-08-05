export function HomePage() {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1>Welcome to the Eligibility Check App</h1>
        <p className="lead text-muted">Use the app to search and recheck member eligibility.</p>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">How to Use:</h5>
          <ol className="lh-lg">
            <li><strong>Login:</strong> You must be logged in to access member data. Contact admin for credentials.</li>
            <li><strong>Start a Check:</strong> Use the <span className="text-warning fw-bold">"Eligibility Check"</span> tab to submit new checks.</li>
            <li>Enter member details and submit to check their coverage.</li>
            <li>You'll be taken directly to that member’s detail page after a successful check.</li>
            <li><strong>View Existing Members:</strong> Use the <span className="text-warning fw-bold">"Members"</span> tab to browse or search for members.</li>
            <li>Recheck their status anytime using the buttons on their page.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
