import { useState } from "react";
import axios from "axios";

interface FetchError {
  message: string;
  code?: string;
}

const useFetch = (url: string, input: string) => {
  const [data, setData] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state on new request

    try {
      const response = await axios.post(
        url,
        {
          prompt: `SVG Icon for ${input}`,
          n: 3, // number of icons to generate
          size: "256x256",
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      setData(response.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError({
          message: err.message,
          code: err.response?.status ? String(err.response.status) : undefined,
        });
      } else {
        setError({ message: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
