import React from 'react';

const PagePoints = props => {
	const points = (
    	<div className="alignment">
    	{
        	[...Array(4)].map((icon, index) => {
        		const marked = props.page !== index + 1 ? 'outline' : ''
        		return <i className={`teal circle ${marked} icon`} key={index}></i>
        	})
      	}
      	</div>
    )

	return (
		<div className="row h-25">{points}</div>
	)
}

export default PagePoints;