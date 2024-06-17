import { useWeb5 } from "./lib/contexts";

const App = () => {
  const { did, connect, disconnect } = useWeb5();

  return (
    <div className="p-4 space-y-3">
      <p className="text-lg text-gray-600">{did}</p>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={connect}
        >
          Connect
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={disconnect}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default App;
