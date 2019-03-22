import React from 'react';

const PageTwo = props => {
		const { paid, group, handlePaymentsChange } = props
		const payers = (
			<div className="h-75">
				<h1 className="h-50 d-flex align-items-center justify-content-center">Who paid?</h1>
				<div className="h-50 centered">
				{
					group.members.map((member, i) => {
						return  <div key={member.user._id}>
									<span><h3>{member.user.username}</h3></span>
									<span>     </span>
									<span className="ui big right labeled input">
										<label for="amount" className="ui teal label">
											{group.currency}
										</label>
										<input type='number' placeholder='0.00' name='paid' 
										min='0' pattern="^\d*(\.\d{0,2})?$" step='0.01'
										value={paid[i] ? paid[i] : ''}
										onChange={e => handlePaymentsChange(i, e)} />
									</span>
								</div>
					})
				}
				</div>
			</div>
		)


	return (
	    <div className="alignment h-100 w-100">
	        {payers}
	    </div>
	)
}

export default PageTwo;