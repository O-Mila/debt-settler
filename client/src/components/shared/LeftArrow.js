import React from 'react';

const LeftArrow = props => {
    const previousPage = (
      <i className='huge teal chevron left icon' onClick={props.previousPage}></i>
    )
    return (
    	<div className="col container arrow-container">
    		{previousPage}
    	</div>
    )
}

export default LeftArrow;