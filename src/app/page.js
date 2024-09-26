import Image from "next/image";

export default function Home() {
	return (
		<div>
			<h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
			<Image
				className="dark:invert"
				src="https://nextjs.org/icons/next.svg"
				alt="Next.js logo"
				width={180}
				height={38}
				priority
			/>
		</div>
	);
}
