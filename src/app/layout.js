import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { cookies } from "next/headers";

import "./globals.css";

export const metadata = {
	title: "Pokemon App",
	description: "All Pokemon data in one place",
};

export default function RootLayout({ children }) {
	const userCookie = cookies().get("user");
	const isLoggedIn = !!userCookie;
	return (
		<html lang="en">
			<body className={"flex flex-col min-h-screen"}>
				<Header isLoggedIn={isLoggedIn} />

				<div className="flex flex-grow">
					<div className="sticky top-[70px] h-full">
						<Sidebar isLoggedIn={isLoggedIn} />
					</div>
					<main className="flex-grow overflow-y-auto">{children}</main>
				</div>
				<Footer />
			</body>
		</html>
	);
}
