import React from 'react';

const PageTwo = props => {
		const { paid, group, handlePaymentsChange } = props
		const payers = (
			<div>
				<h1 className='d-flex align-items-center justify-content-center'>
					Who paid?
				</h1>
				<div className="centered">
				{
					group.members.map((member, i) => {
						return  <div key={member.user._id}>
									<span><h5>{member.user.username}</h5></span>
									<span>     </span>
									<span className='ui w-50 right labeled input'>
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
	    <div className="alignment w-100">
	        {payers}
	    </div>
	)
}

export default PageTwo;