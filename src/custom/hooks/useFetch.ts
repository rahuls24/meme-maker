import { useCallback, useEffect, useReducer, useRef } from 'react';
type State<T> = {
	data?: T;
	error?: Error;
	isLoading?: Boolean;
};
type Action<T> =
	| { type: 'LOADING'; payload: boolean }
	| { type: 'FETCHED'; payload: T }
	| { type: 'ERROR'; payload: Error };

function useFetch<T = unknown>(url: string, options: RequestInit):State<T>{
	const initialState: State<T> = {
		data: undefined,
		error: undefined,
		isLoading: undefined,
	};
	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case 'LOADING':
				return {
					...state,
					isLoading: action.payload,
				};
			case 'FETCHED':
				return {
					...state,
					isLoading: false,
					data: action.payload,
				};
			case 'ERROR':
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(fetchReducer, initialState);
	const isCancelled = useRef<boolean>(false);
	const fetchRequestHandler = useCallback(async (url:string) => {
		try {
			dispatch({ type: 'LOADING', payload: true });
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const data = (await response.json()) as T;
			if (isCancelled.current) return;
			dispatch({ type: 'LOADING', payload: false });
			dispatch({ type: 'FETCHED', payload: data });
		} catch (error) {
			if (isCancelled.current) return;
			dispatch({ type: 'LOADING', payload: false });
			dispatch({ type: 'ERROR', payload: error as Error });
		}
		// eslint-disable-next-line
	}, [url]);
	useEffect(() => {
		isCancelled.current = false;
		fetchRequestHandler(url);
		return () => {
			isCancelled.current = false;
		};
	}, [url, fetchRequestHandler]);
	return state;
}
export default useFetch;
