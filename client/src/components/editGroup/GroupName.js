import React from 'react';

const GroupName = props => {
	return (
		<div>
			<div className="ui horizontal divider">Current group name</div>
		    <div className="ui massive fluid input alignment centered">
		        <input type='text' placeholder="Group name..." value={props.name} name="name"
		              onChange={props.handleChange}  />
		    </div>
	    </div>
	)
}

export default GroupName;