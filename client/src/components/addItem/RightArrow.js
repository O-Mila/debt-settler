import React from 'react';
import { twoDecimals } from "../../actions/index";

const RightArrow = props => {
	const { page, name, received, total } = props
	const totalReceived = received.amounts.length ? 
        twoDecimals(received.amounts.reduce((sum, amount) => sum + amount)) : ''
    const hiddenRight = (page === 1 && name.length > 3) || (page === 2 && total !== 0) || 
    	(page === 3 && totalReceived === total) ? '' : 'hidden'
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