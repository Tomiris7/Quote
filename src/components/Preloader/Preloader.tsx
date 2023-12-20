import "./preloader.css";
import {FC} from "react";

export const Preloader:FC = () => {
	return (
		<>
			<div className="preloader">
				<div className="preloader__row">
					<div className="preloader__item"></div>
					<div className="preloader__item"></div>
				</div>
			</div>
		</>
	)
}
