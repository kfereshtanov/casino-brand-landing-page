import Wheel from "./Wheel";
import styles from "@/styles/WheelSection.module.css";

export default function WheelSection() {
	return (
		<div className={styles["wheel-section"]}>
			<div className="shell">
				<div className={styles["wheel-section__inner"]}>
					<div className={styles["wheel-section__content"]}>
						<div className={styles["wheel-section__glow"]} />

						<h1 className={styles["wheel-section__logo"]}>
							<span
								className={styles["wheel-section__logo-royal"]}>
								Royal
							</span>
							<span className={styles["wheel-section__logo-ace"]}>
								Ace
							</span>
						</h1>

						<p className={styles["wheel-section__subtitle"]}>
							Spin the wheel and win amazing prizes!
						</p>

						<Wheel />
					</div>
				</div>
			</div>
		</div>
	);
}
