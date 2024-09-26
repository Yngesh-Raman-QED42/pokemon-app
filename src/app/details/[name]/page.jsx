import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";

// Function to fetch details for a specific Pokémon
const fetchPokemonDetails = async (pokemonName) => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
	if (!res.ok) {
		return null;
	}
	if (Math.random() > 0.9) {
		throw new Error("Failed to fetch Pokémon details");
	}
	return res.json();
};

// Function to fetch all Pokémon names for static paths generation
const fetchAllPokemons = async () => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000"); // Adjust limit as needed
	const data = await res.json();
	return data.results.map((pokemon) => pokemon.name);
};

// Generate static paths for SSG
export async function generateStaticParams() {
	const pokemons = await fetchAllPokemons();
	return pokemons.map((pokemonName) => ({ name: pokemonName }));
}

export async function generateMetadata({ params }) {
	const pokemonName = params.name;

	// You can also fetch data here if you want to add dynamic description based on Pokemon data.
	return {
		title: `Pokemon app | ${
			pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
		}`,
		description: `Learn more about ${pokemonName}, its abilities, stats, and more in the Pokemon App.`,
	};
}

// The main component for the Pokémon detail page
export default async function PokemonDetailPage({ params }) {
	const { name } = params;
	const pokemon = await fetchPokemonDetails(name);

	if (!pokemon) {
		notFound(); // This will show the not-found.tsx page if Pokémon doesn't exist
	}
	return (
		<div className=" py-10 px-4 dark:bg-gray-900 dark:text-gray-200">
			<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
				{/* Pokemon Name and Image Section */}
				<div className="flex items-center bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 p-6">
					<Image
						src={pokemon.sprites.other.dream_world.front_default}
						alt={pokemon.name}
						width={200}
						height={200}
						className="rounded-full border-4 w-48 h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-700 object-contain border-white shadow-lg"
					/>
					<div className="ml-6">
						<h1 className="text-white text-5xl font-extrabold capitalize tracking-wider">
							{pokemon.name}
						</h1>
						<p className="text-white text-lg italic">#{pokemon.id}</p>
					</div>
				</div>

				{/* Pokemon Stats and Info */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
					{/* Basic Info */}
					<div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg">
						<h2 className="text-3xl font-bold text-blue-600 dark:text-indigo-300 mb-4">
							Basic Info
						</h2>
						<p>
							<span className="font-semibold">Height:</span>{" "}
							{pokemon.height / 10} m
						</p>
						<p>
							<span className="font-semibold">Weight:</span>{" "}
							{pokemon.weight / 10} kg
						</p>
						<p>
							<span className="font-semibold">Base Experience:</span>{" "}
							{pokemon.base_experience}
						</p>
						<p>
							<span className="font-semibold">Type:</span>{" "}
							{pokemon.types.map((t) => t.type.name).join(", ")}
						</p>
					</div>

					{/* Pokemon Abilities */}
					<div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg">
						<h2 className="text-3xl font-bold text-blue-600 dark:text-indigo-300 mb-4">
							Abilities
						</h2>
						<ul>
							{pokemon.abilities.map((ability) => (
								<li key={ability.ability.name} className="capitalize mb-2">
									{ability.ability.name}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Additional Info (Stats) */}
				<div className="p-6 bg-gray-50 dark:bg-gray-800">
					<h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-indigo-300">
						Stats
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{pokemon.stats.map((stat) => (
							<div
								key={stat.stat.name}
								className="bg-indigo-100 dark:bg-indigo-800 rounded-lg shadow-md p-4 flex flex-col items-center "
							>
								<p className="font-semibold capitalize">{stat.stat.name}</p>
								<p className="text-2xl font-bold">{stat.base_stat}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
