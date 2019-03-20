import React from "react";

const PageFour = props => {
	const { name, group, paid, received, addItem } = props
	const itemHeader = (
		<thead>
			<tr>
				<th scope="col" className="centered">User</th>
				<th scope="col" className="centered">Pays</th>
				<th scope="col" className="centered">Consumes</th>
			</tr>
		</thead>	
	) 
	const itemBody = (
		<tbody>
		{	
			group.members.map((member, i) => {
				return  <tr key={member._id}>
							<td className="centered">{member.user.username}</td>
							<td className="centered">{paid[i]} {group.currency}</td>
							<td className="centered">{received.amounts[i]} {group.currency}</td>
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