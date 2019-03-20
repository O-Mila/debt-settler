import React from "react";
import MemberList from "./MemberList";

const PageFour = props => {

	return (
	    <div className="w-100 h-100">
	        <form onSubmit={props.addGroup} className="h-100">
	            <h1 className="w-100 h-25 d-flex align-items-center justify-content-center">
	            	{props.name}
	            </h1>
	            <MemberList {...props} />
	            <button className="ui fluid huge teal button">Add group</button>
	        </form>
	    </div>
	)
}

export default PageFour;