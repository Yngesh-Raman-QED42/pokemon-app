"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function UpgradePage() {
	const router = useRouter();
	const user = Cookies.get("user");
	let userData = null;
	if (user) {
		userData = JSON.parse(user);
	}

	const handleUpgrade = (type) => {
		const userData = JSON.stringify({ username: "sample_user", type });
		Cookies.set("user", userData);
		router.refresh();
	};

	return (
		<div className="flex items-center h-full justify-center">
			{userData && userData.type === "premium" ? (
				<div className="text-center bg-white shadow-lg rounded p-6">
					<h1 className="text-4xl text-zinc-600 font-bold mb-4">
						You are a Premium user
					</h1>
					<button
						onClick={() => handleUpgrade("basic")}
						className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
					>
						Become Basic
					</button>
				</div>
			) : (
				<div className="text-center bg-white shadow-lg rounded p-6">
					<h1 className="text-4xl text-zinc-600 font-bold mb-4">
						Upgrade to Premium
					</h1>
					<p className="text-lg text-gray-500 mb-4">
						Get access to exclusive content by upgrading your account.
					</p>
					<button
						onClick={() => handleUpgrade("premium")}
						className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
					>
						Upgrade Now
					</button>
				</div>
			)}
		</div>
	);
}
