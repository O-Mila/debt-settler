import React from "react";

const PageFour = props => {
	const { name, group, paid, received, addItem } = props
	const itemHeader = (
		<thead>
			<tr>
				<th scope="col">User</th>
				<th scope="col">Pays</th>
				<th scope="col">Consumes</th>
			</tr>
		</thead>	
	) 
	const itemBody = (
		<tbody>
		{						
			group.members.map((member, i) => {
				return  <tr key={member._id}>
							<td>{member.user.username}</td>
							<td>{paid[i]} {group.currency}</td>
							<td>{received.amounts[i]} {group.currency}</td>
						</tr>
			})
		}
		</tbody>
	)
	return (
		<div className="container">
			<form onSubmit={addItem}>
				<h1 className="centered">{name}</h1>
				<table className="table">
					{itemHeader}
					{itemBody}
				</table>
				<button className="ui fluid huge teal button">Add item</button>
			</form>
		</div>
	)
}


export default PageFour;