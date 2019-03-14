import React from 'react';

const RightArrow = props => {
	const { page, totalPages } = props
    const hiddenRight = (page !== totalPages) ? '' : 'hidden'
    const nextPage = (
      <i className={`huge teal chevron right icon ${hiddenRight}`} onClick={props.nextPage}></i>
    )
    return (
        <div className="col container arrow-container">{nextPage}</div>
    )
}

export default RightArrow;