import React from 'react';

const PagePoints = props => {
  const { page, totalPages } = props
	const points = (
    	<div className="alignment">
    	{
        	[...Array(totalPages)].map((icon, index) => {
        		const marked = page !== index + 1 ? 'outline' : ''
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