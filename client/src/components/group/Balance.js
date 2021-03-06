import React from 'react';

const Balance = props => {
	const { members, currency } = props.group
	const sortedMembers = members.sort((a, b) => a.balance < b.balance ? 1 : -1)
	const color = balance => {
		if(balance > 0) return 'green'
		if(balance < 0) return 'red'
		else return ''
	}
	return (
		<div>
			<div className="ui horizontal divider">
				<i className="balance scale icon"></i>
				<div className="section-title">Balances</div>
			</div>
  			<div className="row justify-content-center">
			{
				sortedMembers.map(member =>
					<span key={member._id} 
						className={`ui button disabled ${color(member.balance)} mb-1`} >
							{`${member.user.username}: ${member.balance} ${currency}`}
					</span>
				)
			}
			</div>
		</div>
	)
}

export default Balance;