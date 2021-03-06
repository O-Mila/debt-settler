import React from 'react';
import { twoDecimals } from "../../../actions/index"

const PageThree = props => {
	const { group, total, received, handleConsumptionsAmountsChange, handleConsumptionsBenefitsChange } = props
	const selected = active => {
		if(active) return 'blue'
		return 'disabled'
	}
	const totalReceived = received.amounts.length ?
        twoDecimals(received.amounts.reduce((sum, amount) => sum + amount)) : ''
    const difference = totalReceived - total
    const sign = difference > 0 ? 'lower' : 'higher'
    const notExact = difference !== 0 ? (
    	<div className="alert alert-warning">
    		{`The total amount should be ${twoDecimals(Math.abs(difference))} ${group.currency} ${sign}`}
    	</div>
    ) : ''
	const consumers = (
		<div>
			<h1 className={`d-flex align-items-center justify-content-center`}>
				For whom?
			</h1>
			{notExact}
			<div className="centered">
			{
				group.members.map((member, i) => {
					return  <div key={member.user._id}>
								<span className={`ui small ${selected(received.benefits[i])} button`}>
									{member.user.username}
								</span>
								<span className={`ui tiny toggle checkbox`}>
									<input type='checkbox' name='received' 
									checked={received.benefits[i]}
									onChange={e => handleConsumptionsBenefitsChange(i,e)} />
									<label></label>
								</span>
								<span className={`ui w-50 ${selected(received.benefits[i])} right labeled input`}>
									<label for="amount" className="ui blue label">
										{group.currency}
									</label>
									<input type='number' placeholder='0.00' name='paid' 
									min='0' pattern="^\d*(\.\d{0,2})?$" step='0.01'
									value={received.amounts[i]}
									onChange={e => handleConsumptionsAmountsChange(i, e)} />
								</span>
							</div>
				})
			}
			</div>
		</div>
	)

	return (
	    <div className="alignment w-100">
	        {consumers}
	    </div>
	)
}

export default PageThree;
