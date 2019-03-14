import React from 'react';

const RightArrow = props => {
	const { page, name, received, total } = props
	const someoneBenefits = received.benefits.some(benefit => benefit === true)
    const hiddenRight = (page === 1 && name.length > 3) || (page === 2 && total !== 0) || 
    	(page === 3 && someoneBenefits) ? '' : 'hidden'
    const nextPage = (
      <i className={`huge teal chevron right icon ${hiddenRight}`} onClick={props.nextPage}></i>
    )
    return (
        <div className="col container arrow-container">{nextPage}</div>
    )
}

export default RightArrow;