import React from 'react';

const RightArrow = props => {
	const { page, totalPages } = props
    const hiddenRight = (page !== totalPages) ? '' : 'hidden'
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