import React, { Fragment, useState, useEffect } from "react";
import SliderButton from "./SliderButton";
import "../../css/ImageSlider.css";

export default function ImageSlider(props) {
	// magic voodoo from an indian guy on yt
	useEffect(() => {
		function handle(event) {
			// left we go back
			if (event.code === "ArrowLeft") {
				prevSlide();
			}
			// right forward
			if (event.code === "ArrowRight") {
				nextSlide();
			}
			// esc we go out
		}
		document.addEventListener("keydown", handle);
		return () => {
			document.removeEventListener("keydown", handle);
		};
	});

	// state hook holding index of active image
	const [slideIndex, setSlideIndex] = useState(0);

	// next slide
	const nextSlide = () => {
		if (slideIndex !== props.images.length - 1) {
			setSlideIndex(slideIndex + 1);
		} else {
			setSlideIndex(0);
		}
	};
	// previous slide
	const prevSlide = () => {
		if (slideIndex !== 0) {
			setSlideIndex(slideIndex - 1);
		} else {
			setSlideIndex(props.images.length - 1);
		}
	};

	return (
		<div className="container-slider">
			{/* map all images for slider */}
			{props.images.map((obj, key) => {
				return (
					<div
						key={key}
						// if active index, needs active class
						className={
							slideIndex === key
								? "image-slide active-image-slide"
								: "image-slide"
						}
					>
						<img alt={"Image of " + props.title} src={obj} />
					</div>
				);
			})}

			{/* if not single img */}
			{props.images.length !== 1 ? (
				// buttons to change imgs
				<Fragment>
					<SliderButton onClick={nextSlide} direction={"next"} />
					<SliderButton onClick={prevSlide} direction={"prev"} />
				</Fragment>
			) : null}
		</div>
	);
}
