import styles from "@/styles/ResultPopup.module.css";

export default function ResultPopup({ result, onClose }) {
	if (!result) return null;

	const isEmpty = result === "Empty";

	return (
		<div className="overlay" onClick={onClose}>
			<div
				className={styles["popup"]}
				onClick={(e) => e.stopPropagation()}>
				<button className={styles["popup__close"]} onClick={onClose}>
					&times;
				</button>

				<h2 className={styles["popup__title"]}>
					{isEmpty ? "Better luck next time!" : "Congratulations!"}
				</h2>

				<p className={styles["popup__message"]}>
					{isEmpty ? (
						"You didn't win this time. Try again later!"
					) : (
						<>
							You won <strong>{result}</strong>
						</>
					)}
				</p>

				<button className={styles["popup__btn"]} onClick={onClose}>
					{isEmpty ? "Close" : "Claim"}
				</button>
			</div>
		</div>
	);
}
