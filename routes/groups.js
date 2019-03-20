const express = require("express");
const router = express.Router();
const Group = require("../database/models/group");
const Payment = require("../database/models/payment");
const User = require("../database/models/user");

twoDecimals = amount => Math.round(amount*100)/100

// Add new group
router.post("/new", (req, res) => {
	const { name, currency, members } = req.body;
	const usernames = members.map(member => member.username);
	User.find({ username: usernames }).populate("groups").exec()
	.then(users => {
		const groupExists = users.some(user => user.groups.some(group => group.name === name))
		if(groupExists) res.send("This group name already exists in some member's account");
		else {
			const groupMembers = users.map(user => {
				return { user, balance: 0, debts: [] }
			})
			const date = Date.now()
			Group.create({ name: name, currency: currency, members: groupMembers, date: date })
			.then(newGroup => res.json(newGroup))
			.catch(err => res.json(err))		
		}
	})
	.catch(err => res.json(err))
})

// Add group to the user objects
router.post("/new/:group_id", (req, res) => {
	Group.findById(req.params.group_id).populate({
		path: "members.user",
		model: "User"
	}).exec().then(group => {
		const usernames = group.members.map(member => member.user.username);
		User.find({ username: usernames }) 
		.then(users => {
			users.forEach(user => {
				user.groups.push(group);
				user.save();
			})
			res.json(users);			
		})
		.catch(err => res.json(err))
	})
	.catch(err => res.json(err))
})

// Update group debts
router.put("/:group_id/debts", (req, res) => {
	Group.findById(req.params.group_id)
	.populate({ path: "members.debts.receiver", model: "User" })
	.exec().then(group => {
		const balances = group.members.map(member => member.balance)
		group.members.forEach(member => member.debts = [])
		while(balances.some(balance => balance !== 0)){
			let greatestIndex = balances.indexOf(Math.max(...balances));
			let lowestIndex = balances.indexOf(Math.min(...balances));
			let amount = Math.min(Math.abs(balances[greatestIndex]), Math.abs(balances[lowestIndex]))
			group.members[lowestIndex].debts.push({
				amount: twoDecimals(amount),
				receiver: group.members[greatestIndex].user
			})
			balances[greatestIndex] = twoDecimals(balances[greatestIndex] - amount)
			balances[lowestIndex] = twoDecimals(balances[lowestIndex] + amount)
		}
		group.save()
		res.json(group)
	})
	.catch(err => res.json(err))
})

// Retrieve selected group
router.get("/:group_id", (req, res) => {
	const { group_id } = req.params
	Group.findById(req.params.group_id).populate("items")
	.populate({ path: "transfers", model: "Transfer",
		populate: [{ path: "payer", model: "User" },
				   { path: "receiver", model: "User" }]
	})
	.populate({ path: "members.user", model: "User" })
	.populate({ path: "members.debts.receiver", model: "User" })
	.exec().then(group => res.json(group))
	.catch(err => res.json(err))
})

module.exports = router