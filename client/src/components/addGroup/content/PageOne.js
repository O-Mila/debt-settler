import React from 'react';

const PageOne = props => {
	return (
	    <div className="col-xs-2 col-sm-6 col-md-8 alignment centered">
	        <input type='text' placeholder="Group name..." value={props.name} name="name"
	            onChange={props.handleChange}  />
	    </div>
	)
}

export default PageOne;