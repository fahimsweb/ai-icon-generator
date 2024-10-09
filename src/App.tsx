import { useState } from "react";
import IconList from "./componets/IconList";
import Loader from "./componets/Loader";
import useFetch from "./hooks/useFetch";
import { OPENAI_API_URL } from "./config";

const App = () => {
  const [input, setInput] = useState("");

  const { data, loading, error, fetchData } = useFetch(OPENAI_API_URL, input);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-900 p-4 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-pulse bg-gray-900"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-purple-900 via-gray-800 to-gray-900 opacity-50"></div>
        </div>
        <div className="z-10 w-full max-w-lg space-y-4">
          <h1 className="py-5 text-center text-xl font-bold">
            Generative AI - Icon Generator (OpenAI and DALL-E)
          </h1>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter search term... Ex: arrow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Generate
            </button>
          </div>
          {loading && <Loader />}
          {data && (
            <div className="mt-4 rounded-md border border-gray-700 bg-gray-800 p-4">
              <p className="text-white">
                <IconList icons={data} />
              </p>
            </div>
          )}
          {error && (
            <div
              className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Sorry, An error has occured: </span>{" "}
              ${error.message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default App;
