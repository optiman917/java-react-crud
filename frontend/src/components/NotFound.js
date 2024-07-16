import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="px-4">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-900">Go to the home page</Link>
      </p>
    </div>
  );
}
