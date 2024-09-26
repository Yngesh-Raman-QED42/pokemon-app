export default function Footer() {
	return (
		<footer className="bg-gray-800 text-white text-center p-4 mt-auto">
			<p className="text-sm">
				© {new Date().getFullYear()} Pokémon App. All Rights Reserved.
			</p>
		</footer>
	);
}
