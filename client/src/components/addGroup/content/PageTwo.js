import React from 'react';

const PageTwo = props => {
	const { handleChange, currency } = props
	return (
		<select className="btn btn-secondary btn-md dropdown-toggle" name="currency" 
			value={currency} onChange={handleChange}>
  				<option value="">Currency</option>
  				<option value="$">USD</option>
  				<option value="€">EUR</option>
  				<option value="£">GBP</option>
  				<option value="¥">JPY</option>
  				<option value="₹">INR</option>
		</select>
	)
}

export default PageTwo;