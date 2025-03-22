// src/hooks/useApiRequest.ts
import { useEffect, useReducer, useRef } from "react";
import axios, { AxiosRequestConfig } from "axios";

type State<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type Action<T> =
  | { type: "REQUEST_START" }
  | { type: "REQUEST_SUCCESS"; payload: T }
  | { type: "REQUEST_ERROR"; payload: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "REQUEST_START":
      return { ...state, loading: true, error: null };
    case "REQUEST_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "REQUEST_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useApiRequest<T>(
  fetcher: (config?: AxiosRequestConfig) => Promise<T>
) {
  const [state, dispatch] = useReducer(reducer<T>, {
    data: null,
    loading: true,
    error: null,
  });
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "REQUEST_START" });
      try {
        const result = await fetcher({
          signal: abortControllerRef.current.signal,
        });
        dispatch({ type: "REQUEST_SUCCESS", payload: result });
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          const errorMessage = error.response?.data?.message || error.message;
          dispatch({ type: "REQUEST_ERROR", payload: errorMessage });
        }
      }
    };

    fetchData();
    return () => abortControllerRef.current.abort();
  }, [fetcher]);

  return {
    ...state,
    retry: () => (abortControllerRef.current = new AbortController()),
  };
}
