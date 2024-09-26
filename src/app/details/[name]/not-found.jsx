export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="text-5xl font-bold">404</h1>
			<p className="text-gray-500 mt-4 text-lg">
				Sorry, we couldn't find the Pokémon you were looking for.
			</p>
			<a
				href="/"
				className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Go Home
			</a>
		</div>
	);
}
