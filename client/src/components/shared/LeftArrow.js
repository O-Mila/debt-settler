import React from 'react';

const LeftArrow = props => {
    const previousPage = (
      <i className='huge teal chevron left icon' onClick={props.previousPage}></i>
    )
    return (
    	<div className="ui column centered h-100">
    		<div className="h-100 arrow-container">{previousPage}</div>
    	</div>
    )
}

export default LeftArrow;