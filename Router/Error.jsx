import { Link } from "react-router";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-6xl font-extrabold text-rose-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        to="/"
        className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
