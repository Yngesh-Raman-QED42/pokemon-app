"use client"; // Error components must be client-side

export default function Error({ error, reset }) {
	return (
		<div className="text-center mt-10 h-full">
			<h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
			<p className="text-gray-500 mt-4">
				We couldn't load the Pokémon details. Please try again later.
			</p>
			<button
				className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
				onClick={() => reset()}
			>
				Retry
			</button>
		</div>
	);
}
