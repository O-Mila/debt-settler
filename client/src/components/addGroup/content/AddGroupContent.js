import React from "react";
import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";
import PageFour from "./PageFour";

const AddGroupContent = props => {

		const { page, members } = props
		const manyMembers = members.length < 7 || page === 1 ? 'h-100' : ''
		const pageOne = page === 1 ? <PageOne {...props} /> : ''
		const pageTwo = page === 2 ? <PageTwo {...props} /> : ''
		const pageThree = page === 3 ? <PageThree {...props} /> : ''
		const pageFour = page === 4 ? <PageFour {...props} /> : ''
		return (
			<div className={`row ${manyMembers}`}>
				{pageOne}
				{pageTwo}
				{pageThree}
				{pageFour}
			</div>
		)
}

export default AddGroupContent;