import React from "react";

const PageFour = props => {
	const { name, group, paid, received, addItem } = props
	const size = group.members.length < 12 ? 'small' : 'tiny'
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
	const itemBig = (
		<table className="table">
			{itemHeader}
			{itemBody}
		</table>
	)
	const itemSmall = (
		<div>
		{
			group.members.map((member, i) => {
				return  <div key={member._id} className={`ui ${size} button`}>
							{member.user.username}: pays {paid[i]} {group.currency} and receives {received.amounts[i]} {group.currency}
						</div>
			})
		}
		</div>
	)
	const item = group.members.length < 9 ? itemBig : itemSmall
	return (
		<div className="container">
			<form onSubmit={addItem}>
				<h1 className="centered">{name}</h1>
				{item}
				<button className="ui fluid huge teal button">Add item</button>
			</form>
		</div>
	)
}


export default PageFour;