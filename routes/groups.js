const express = require("express"),
router        = express.Router(),
Group 		  = require("../database/models/group"),
Payment 	  = require("../database/models/payment"),
User 		  = require("../database/models/user"),
methods 	  = require("../methods.js");

const { findGroup, findUsersByName, createMembers, updateDebts, twoDecimals } = methods;

// Add new group
router.post("/new", (req, res) => {
	const { name, currency, members } = req.body;
	const usernames = members.map(member => member.username);
	findUsersByName(usernames)
	.then(users => {
		const groupExists = users.some(user => user.groups.some(group => group.name === name))
		if(groupExists) res.send("This group name already exists in some member's account");
		else {
			const groupMembers = createMembers(users)
			const dateCreated = Date.now()
			Group.create({ name: name, currency: currency, 
				members: groupMembers, dateCreated: dateCreated })
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
		findUsersByName(usernames)
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

// Edit group
router.put("/:group_id", (req, res) => {
	const { name, oldMembers } = req.body;
	const { group_id } = req.params;
	const newUsernames = req.body.newMembers.map(newMember => newMember.username);
	findUsersByName(newUsernames).then(newUsers => {
		const groupExistsNew = newUsers.some(user => 
			user.groups.some(group => group.name === name))
		const oldUsernames = oldMembers.map(member => member.user.username)
		findUsersByName(oldUsernames).then(oldUsers => {
			const groupExistsOld = oldUsers.some(user => 
				user.groups.some(group => group.name === name && !group._id.equals(group_id)))
			if(groupExistsNew || groupExistsOld || name.length < 4) {
				res.send("This group name is invalid");
			} else {
				const newMembers = createMembers(newUsers)
				findGroup(group_id).then(group => {
					group.members = [...oldMembers, ...newMembers];
					group.name = name;
					group.dateModified = Date.now()
					group.save()
					res.json(group)
				})
			}
		})
	})
})

// Delete group
router.delete("/:group_id", (req, res) => {
	Group.findOneAndDelete({_id: req.params.group_id})
	.then(() => res.json("Group successfully deleted"))
	.catch(err => res.json(err))
});

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