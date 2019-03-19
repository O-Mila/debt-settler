import React from 'react';

const PageTwo = props => {
	const { handleChange, currency } = props
	return (
		<div className="d-flex align-items-center justify-content-center w-100">
			<select className="btn btn-info btn-lg dropdown-toggle" name="currency" 
				value={currency} onChange={handleChange}>
	  				<option value="">Currency</option>
	  				<option value="$">USD</option>
	  				<option value="€">EUR</option>
	  				<option value="£">GBP</option>
	  				<option value="¥">JPY</option>
	  				<option value="₹">INR</option>
			</select>
		</div>
	)
}

export default PageTwo;