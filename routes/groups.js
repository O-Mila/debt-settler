const express = require("express"),
router        = express.Router(),
Group 		  = require("../database/models/group"),
Payment 	  = require("../database/models/payment"),
User 		  = require("../database/models/user"),
methods 	  = require("../methods.js");

const { findGroup, updateDebts, twoDecimals } = methods;

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
	findGroup(req.params.group_id).then(group => {
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
	findGroup(req.params.group_id).then(group => {
		updateDebts(group)
		group.save()
		res.json(group)
	})
	.catch(err => res.json(err))
})

// Retrieve selected group
router.get("/:group_id", (req, res) => {
	findGroup(req.params.group_id)
	.then(group => res.json(group))
	.catch(err => res.json(err))
})

module.exports = router