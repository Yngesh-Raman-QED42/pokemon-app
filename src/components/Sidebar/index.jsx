"use client";

import { useEffect, useState, useRef } from "react";

import Link from "next/link";

const LIMIT = 20;

export default function Sidebar({ isLoggedIn }) {
	const [pokemonList, setPokemonList] = useState([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const observer = useRef();

	// Fetch Pokémon list
	const fetchPokemonList = async () => {
		setLoading(true);
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
		);
		const data = await res.json();
		setPokemonList((prev) => [...prev, ...data.results]);
		setHasMore(data.count >= pokemonList.length);
		setLoading(false);
	};

	useEffect(() => {
		fetchPokemonList();
	}, [offset]);

	// Infinite scroll logic
	const lastPokemonRef = useRef(null);

	useEffect(() => {
		const observerCallback = (entries) => {
			if (entries[0].isIntersecting && hasMore && !loading) {
				setOffset((prev) => prev + LIMIT);
			}
		};

		const currentObserver = observer.current;

		if (currentObserver) {
			currentObserver.disconnect();
		}

		observer.current = new IntersectionObserver(observerCallback);

		if (lastPokemonRef.current) {
			observer.current.observe(lastPokemonRef.current);
		}

		return () => {
			if (currentObserver) {
				currentObserver.disconnect();
			}
		};
	}, [loading, hasMore]);

	if (!isLoggedIn) {
		return null;
	}
	return (
		<aside className="bg-gray-200 p-4 w-60 h-[calc(100vh-4rem)] overflow-y-auto">
			<h2 className="font-bold text-blue-800 text-lg mb-2">Pokémon List</h2>
			<ul className="space-y-2">
				{pokemonList.map((pokemon, index) => (
					<li
						key={pokemon.name}
						ref={index === pokemonList.length - 1 ? lastPokemonRef : null}
					>
						<Link
							href={`/details/${pokemon.name.toLowerCase()}`}
							className="text-blue-600 hover:underline"
						>
							{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{" "}
							{/* Capitalize the first letter */}
						</Link>
					</li>
				))}
				{loading && <li className="text-blue-400">Loading...</li>}
				{!hasMore && (
					<li className="text-blue-400">No more Pokémon to load.</li>
				)}
			</ul>
		</aside>
	);
}
