import React from 'react';

const PageOne = props => {
	return (
	    <div className="ui massive input alignment">
	        <input type='text' placeholder="Group name..." value={props.name} name="name"
	              onChange={props.handleChange}  />
	    </div>
	)
}

export default PageOne;