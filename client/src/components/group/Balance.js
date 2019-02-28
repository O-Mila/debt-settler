import React from 'react';

const Balance = props => {
	return (
		<div>
			<div className="ui horizontal divider">Balances</div>
  			<div className="ui horizontal list">
			{
				props.balance.map(user =>
					<span key={user._id} className="item" >
						{`${user.username}: ${user.payments}`}
					</span>
				)
			}
			</div>
		</div>
	)
}

export default Balance;