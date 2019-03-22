import React from 'react';
import OldMembers from "./OldMembers";
import NewMembers from "./NewMembers";
import DeletedMembers from "./DeletedMembers";

const MemberList = props => {
	const { newMembers, deletedMembers } = props
	const twoColumnsClass = newMembers.length && deletedMembers.length ?
		"ui two column very relaxed stackable grid" : '' 
    return (
    	<div>
    		<OldMembers {...props} />
	    	<div className={twoColumnsClass} >
	    		<div className="column">
		    		<NewMembers {...props} />
		    	</div>
		    	<div className="column">	    		
				    <DeletedMembers {...props} />
		    	</div>
			</div>
		</div>
    )
}

export default MemberList;