import React from "react";
import MemberList from "./MemberList";

const PageFour = props => {

	return (
	    <div className="w-100">
	        <form onSubmit={props.addGroup}>
	            <div className="w-100 title">{props.name}</div>
	            <MemberList {...props} />
	            <button className="ui fluid huge teal button">Add group</button>
	        </form>
	    </div>
	)
}

export default PageFour;