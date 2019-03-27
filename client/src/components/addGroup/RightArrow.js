import React from 'react';

const RightArrow = props => {
	const { currency, members, page, name } = props
    const hiddenRight = (page === 1 && name.length > 3) || (page === 2 && currency) || 
    	(page === 3 && members.length > 1) ? '' : 'hidden'
    const nextPage = (
      <i className={`huge teal chevron right icon ${hiddenRight}`} onClick={props.nextPage}></i>
    )
    return (
        <div className="ui column centered h-100">
        	<div className="h-100 arrow-container">{nextPage}</div>
        </div>
    )
}

export default RightArrow;