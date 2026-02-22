import styles from "@/styles/Wheel.module.css";
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import ResultPopup from "./ResultPopup";

const choices = [
	"Respin",
	"50 FS",
	"Empty",
	"125%\n+ 100FS",
	"50 FS",
	"Respin",
	"Empty",
	"125%\n+ 100FS",
];

export default function Wheel() {
	const [rotation, setRotation] = useState(0);
	const [spinning, setSpinning] = useState(false);
	const [result, setResult] = useState(null);
	const [hasPlayed, setHasPlayed] = useState(false);
	const totalRotation = useRef(0);
	const sliceDeg = 360 / choices.length;

	useEffect(() => {
		const saved = localStorage.getItem("wheel-result");
		if (saved) {
			setResult(saved);
			setHasPlayed(true);
		}
	}, []);

	const sliceColors = [
		"#9b59b6",
		"#1a1a2e",
		"#e91e8c",
		"#1a1a2e",
		"#7c3aed",
		"#1a1a2e",
		"#e91e8c",
		"#1a1a2e",
	];

	const onCloseHandler = () => {
		localStorage.removeItem("wheel-result");
		setResult(null);
		setHasPlayed(false);
	};

	const spin = useCallback(() => {
		if (spinning || hasPlayed) return;

		setSpinning(true);
		setResult(null);

		const winIndex = Math.floor(Math.random() * choices.length);
		const target = (((90 + sliceDeg * (1 - winIndex)) % 360) + 360) % 360;
		const current = ((totalRotation.current % 360) + 360) % 360;
		const delta = target - current + (target <= current ? 360 : 0);
		const extra = (4 + Math.floor(Math.random() * 3)) * 360;

		totalRotation.current += extra + delta;
		setRotation(totalRotation.current);

		setTimeout(() => {
			setSpinning(false);
			const winner = choices[winIndex];
			if (winner === "Respin") {
				setTimeout(() => {
					setResult(null);
					spin();
				}, 50);
			} else {
				localStorage.setItem("wheel-result", winner);
				setResult(winner);
				setHasPlayed(true);
			}
		}, 4000);
	}, [spinning, hasPlayed]);

	return (
		<div className={styles["wheel-wrapper"]}>
			<div
				className={styles["wheel"]}
				style={{
					transform: `rotate(${rotation}deg)`,
					transition: spinning
						? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
						: "none",
				}}>
				{choices.map((choice, index) => {
					return (
						<div
							key={index}
							className={styles["wheel__choice"]}
							style={{
								"--index": index,
								"--total": choices.length,
								"--slice-color": sliceColors[index],
							}}>
							<span className={styles["wheel__choice-text"]}>
								{choice}
							</span>
						</div>
					);
				})}
			</div>

			<div className={styles["wheel-wrapper__pointer"]} />

			<button
				className={styles["wheel-wrapper__btn"]}
				onClick={spin}
				disabled={spinning || hasPlayed}>
				<Image
					src="/spin.webp"
					alt="Spin"
					width={60}
					height={60}
					priority={true}
				/>
			</button>

			<ResultPopup result={result} onClose={onCloseHandler} />
		</div>
	);
}
