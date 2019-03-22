const Group = require("./database/models/group"),
Payment     = require("./database/models/payment"),
User        = require("./database/models/user"),
Transfer    = require("./database/models/transfer"),
Item        = require("./database/models/item");

module.exports = {

	// Limit number of decimals 
	twoDecimals: amount => Math.round(amount*100)/100,

	// Search pattern (usernames)
	escapeRegex: text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),

	// Find and populate group
	findGroup: async group_id => {
		return await Group.findById(group_id).populate("items")
			.populate({ path: "transfers", model: "Transfer",
				populate: [{ path: "payer", model: "User" },
						   { path: "receiver", model: "User" }]
			})
			.populate({ path: "members.user", model: "User" })
			.populate({ path: "members.debts.receiver", model: "User" })
			.exec()
	},

	// Find and populate item
	findItem: async item_id => {
		return await Item.findById(item_id)
			.populate({
				path: 'payments',
				model: 'Payment',
				populate: {
					path: 'user',
					model: 'User'
				}
			}).exec()
	},

	// Find users by username and populate
	findUsersByName: async usernames => {
		return await User.find({ username: usernames }).populate("groups").exec()
	},

	// Create members
	createMembers: users => {
		const members = users.map(user => {
			return { user, balance: 0, debts: [] }
		})
		return members
	},

	// Update debts
	updateDebts: group => {
		const { twoDecimals } = module.exports
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
	}

}