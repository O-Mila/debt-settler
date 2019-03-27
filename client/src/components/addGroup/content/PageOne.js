import React from 'react';

const PageOne = props => {
	return (
	    <div className="ui input alignment w-75">
	        <input type='text' placeholder="Group name..." value={props.name} name="name"
	            onChange={props.handleChange}  />
	    </div>
	)
}

export default PageOne;