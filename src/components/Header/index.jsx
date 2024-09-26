"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Header({ isLoggedIn }) {
	const router = useRouter();

	const handleLogin = (type) => {
		const userData = JSON.stringify({ username: "sample_user", type });
		Cookies.set("user", userData);
		router.push("/dashboard");
		router.refresh();
	};

	const handleLogout = () => {
		Cookies.remove("user");
		router.push("/");
		router.refresh();
	};

	return (
		<header className="bg-blue-600 z-50 text-white p-4 flex sticky top-0 justify-between items-center">
			<nav className="flex space-x-4">
				<Link href="/" className="text-white-600 hover:underline">
					Home
				</Link>
				{isLoggedIn && (
					<>
						<Link href="/dashboard" className="text-white-600 hover:underline">
							Dashboard
						</Link>
						<Link href="/upgrade" className="text-white-600 hover:underline">
							Upgrade
						</Link>
					</>
				)}
			</nav>
			{isLoggedIn ? (
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-full"
				>
					Log Out
				</button>
			) : (
				<div>
					<button
						onClick={() => handleLogin("premium")}
						className="bg-green-500 hover:bg-green-700 px-4 py-2 mr-4 rounded-full"
					>
						Log In(Premium)
					</button>
					<button
						onClick={() => handleLogin("basic")}
						className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-full"
					>
						Log In(basic)
					</button>
				</div>
			)}
		</header>
	);
}
