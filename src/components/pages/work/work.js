/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DisplayBlock from "./DisplayBlock";
import LargeDisplay from "./LargeDisplay";
import FilterButton from "../../FilterButton";
import "../../../css/work.css";
import "../../../css/filter&sort.css";

// note for images
// 4:3 at 2048×1536 is nice

function work() {
	// state holding work display json data
	const [workDisplay, setWorkDisplay] = useState();
	// state holding filter properties
	const [filterTerm, setFilterTerm] = useState("");
	// state for what we are sorting by
	const [sortingMethod, setSoringMethod] = useState("newest");
	// state holding which button is active
	const [activeButton, setActiveButton] = useState("All");
	// state to control which work we are displaying if any
	const [activeDisplay, setActiveDisplay] = useState();

	// fetch the json file with all the work displays
	useEffect(() => {
		fetch("https://janik.codes/dependencies/work/000_work.json")
			// local
			// fetch("/temp_local.json")
			.then((response) => response.json())
			.then((json) => setWorkDisplay(json.work));
	}, []);

	// contains what buttons we want on the page
	// array order:
	// TEXT, COLOR, FILTER_TAG , SVG
	// the all button filter is blank as we want everything to show
	const neededFilterButtons = [
		["All", "dark_gray", "", "all"],
		["Photoshop", "magenta", "photoshop", ""],
		["Onshape", "blue", "onshape", ""],
		["Illustrator", "light_green", "illustrator", ""],
		["Python", "sun_flower", "python", ""],
		["Blender", "orange", "blender", ""],
		["SolidWorks", "red", "solidworks", ""],
	];

	// handels when a filter button is pressed
	function handleFilterButtonClick(buttonPressed, buttonFilter) {
		// if button is pressed it becomes active
		setActiveButton(buttonPressed);
		// sets the filtering term to whatever the buttons filtering is
		setFilterTerm(buttonFilter.toLowerCase());
	}

	// handels change of sorting
	function sortBy(event) {
		setSoringMethod(event.target.value);
	}

	// compares the array elements based on what we're sorting by
	function compare(a, b) {
		// if we are sorting by coolness facto
		if (sortingMethod === "coolness") {
			return b.coolness - a.coolness;
		}
		// newest
		else if (sortingMethod === "newest") {
			return Date.parse(b.date) - Date.parse(a.date);
		}
		// oldest
		else if (sortingMethod === "oldest") {
			return Date.parse(a.date) - Date.parse(b.date);
		}
		// in case
		else {
			console.log("Error sorting.");
			return 0;
		}
	}

	return (
		<div className="work-page">
			<Helmet>
				<title>work - janik</title>
			</Helmet>
			<h1 className="page-title">work</h1>

			<br />

			{/* for sorting thru work display */}
			<div className="filterAndSortBlock">
				{/* the buttons for filtering */}
				<div className="filterButtons">
					{neededFilterButtons.map((button) => (
						<FilterButton
							activeButton={activeButton}
							key={button[0]}
							text={button[0]}
							color={button[1]}
							icon={button[3]}
							onClick={() => {
								handleFilterButtonClick(button[0], button[2]);
							}}
						/>
					))}
				</div>

				{/* the sort drop down */}
				<div className="sortMenu">
					{/* if i want a sort menu later */}
					<label>
						Sort by: <span>&nbsp;</span>
					</label>
					<select className="sortDropdown" onChange={sortBy}>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
						<option value="coolness">Coolness &#128526;</option>
					</select>
				</div>
			</div>

			<br />

			{/* map all the json work displays to the componets */}
			{/* but before it maps, it filters the objects 
				based on the filter. anything that has the filter passes*/}
			{workDisplay ? (
				// container for all the blocks
				<div className="displayParent">
					{workDisplay
						.filter((display) => {
							if (filterTerm === "") {
								return display;
							} else if (
								display.tags.some(
									(tag) =>
										tag.toLowerCase() ===
										filterTerm.toLowerCase()
								)
							) {
								return display;
							} else {
								// if the display doesnt have the filter, dont pass it
								return null;
							}
						})
						.sort(compare)
						.map((display, key) => {
							return (
								<DisplayBlock
									title={display.title}
									key={key}
									count={Object.keys(display.images).length}
									thumbnail={display.images[0]}
									onClick={() => {
										setActiveDisplay(display);
									}}
								/>
							);
						})}
				</div>
			) : (
				// if there is an issue loading the json
				<p>Issues loading work page. Please contact admin.</p>
			)}

			{/* if somethings is actively displayed */}
			{activeDisplay ? (
				<LargeDisplay
					displayObject={activeDisplay}
					close={() => {
						setActiveDisplay(null);
					}}
				/>
			) : null}
			{/* lock scroll when display is up */}
			{activeDisplay
				? document.body.classList.add("noscroll")
				: document.body.classList.remove("noscroll")}
		</div>
	);
}

export default work;
