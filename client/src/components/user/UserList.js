import React from 'react';

const UserList = props => {
	const { group } = props;
	const members = (
		<div>
			{
				group.users.map(user => {
					return <div key={user._id} >
								<div>{user.username}</div>
						   </div>
				})
			}
		</div>
	)
	return <div>{members}</div>
}

export default UserList;