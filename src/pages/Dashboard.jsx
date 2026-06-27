function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">👑 Your Empire</h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome back, Your Majesty!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">🐟 Tuna</h2>
            <p className="text-3xl">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">📦 Cardboard</h2>
            <p className="text-3xl">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">😺 Subjects</h2>
            <p className="text-3xl">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
