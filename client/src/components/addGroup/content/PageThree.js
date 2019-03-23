import React from 'react';
import MemberList from "./MemberList";
import AddUser from "./AddUser";

const PageThree = props => {

	return (
	    <div className="alignment h-100 w-100">
	        <div className="h-50"><MemberList {...props} /></div>
	       	<AddUser {...props} />
	    </div>
	)
}

export default PageThree;