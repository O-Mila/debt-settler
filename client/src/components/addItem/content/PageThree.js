import React from 'react';

const PageThree = props => {
	const { group, received, handleConsumptionsChange } = props
	const selected = active => {
		if(active) return 'blue'
		return ''
	}
	const consumers = (
		<div className="h-75">
			<h1 className="h-50 d-flex align-items-center justify-content-center">
				For whom?
			</h1>
			<div className="h-50 centered">
			{
				group.members.map((member, i) => {
					return  <div key={member.user._id}>
								<span className={`ui big ${selected(received.benefits[i])} button`}>
									{member.user.username}
								</span>
								<div className="ui toggle massive checkbox">
									<input type='checkbox' name='received' 
									checked={received.benefits[i]}
									onChange={e => handleConsumptionsChange(i,e)} />
									<label>{received.amounts[i]} {group.currency}</label>
								</div>
							</div>
				})
			}
			</div>
		</div>
	)

	return (
	    <div className="alignment h-100 w-100">
	        {consumers}
	    </div>
	)
}

export default PageThree;
