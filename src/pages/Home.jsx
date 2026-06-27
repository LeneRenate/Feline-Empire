import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Feline Empire</h1>
        <p className="text-xl">Rule your cat kingdom and dominate the world!</p>
        <div className="space-x-4 mt-8">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
