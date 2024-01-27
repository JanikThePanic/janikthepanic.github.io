import React, { Fragment } from "react";

function SupportMe() {
	return (
		<Fragment>
			<br />

			{/* if you are seeing this, pls donate */}
			<h2>
				<span role="img" aria-label="hand pointing down">
					☕
				</span>{" "}
				buy me a coffee{" "}
				<span role="img" aria-label="hand pointing down">
					☕
				</span>
			</h2>
			<p>
				turns out the things i like cost money
				<br />
				paypal.me/
				<a
					href="https://www.paypal.me/thejanik"
					target="_blank"
					rel="noopener noreferrer"
				>
					thejanik
				</a>
			</p>
		</Fragment>
	);
}

export default SupportMe;
