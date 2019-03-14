import React from 'react';

const PageOne = props => {
	return (
	    <div className="ui massive input alignment">
	        <input type='text' placeholder="Expense name..." value={props.name} name="name"
	              onChange={props.handleNameChange}  />
	    </div>
	)
}

export default PageOne;