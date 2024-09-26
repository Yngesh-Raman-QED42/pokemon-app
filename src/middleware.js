import { NextResponse } from "next/server";

export function middleware(request) {
	const { pathname } = request.nextUrl;
	const userCookie = request.cookies.get("user");

	// Redirect logged-out users away from the dashboard
	if (!userCookie) {
		const url = new URL("/", request.url);
		return NextResponse.redirect(url);
	}

	// If the user is logged in but is basic and tries to access the details page, redirect to upgrade
	const user = userCookie ? JSON.parse(userCookie.value) : null;
	if (user?.type === "basic" && pathname.startsWith("/details")) {
		const upgradeUrl = new URL("/upgrade", request.url);
		return NextResponse.redirect(upgradeUrl);
	}

	// Continue if everything checks out
	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/details/:path*"],
};
