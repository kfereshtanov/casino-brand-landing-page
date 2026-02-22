import Head from "next/head";
import WheelSection from "@/components/WheelSection";

export default function Home() {
	return (
		<>
			<Head>
				<title>Casino Brand</title>
				<meta name="description" content="Casino Brand" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="page">
				<main className="main">
					<WheelSection />
				</main>
			</div>
		</>
	);
}
