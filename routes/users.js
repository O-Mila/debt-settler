const express = require('express'),
router 		  = express.Router(),
User 		  = require('../database/models/user'),
passport      = require('passport');

// Escape Regular Expressions (used when searching users to add to group)
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Add a new User to the database and login
router.post('/register', (req, res) => {
	const { username, password } = req.body;
	if(password.length > 3 && username.length > 3){
		const date = Date.now()
		const newUser = new User({username: username, date: date});
		User.register(newUser, password) 
		.then(user => passport.authenticate('local')(req, res, () => res.json(user)))
		.catch(err => res.send('This username is already registered'))	
	} else if (username.length > 3){
		res.send('Your password should be at least 4 characters long!')
	} else if (password.length > 3){
		res.send('Your username should be at least 4 characters long!')
	} else {
		res.send('Your username and your password should be at least 4 characters long!')
	}
});

// Login registered account
router.post('/login', passport.authenticate('local'), (req, res) => {
	const { username } = req.body;
	User.find({ username: username })
	.then(user => res.json(user))
	.catch(err => res.json(err))
})

// Logout account
router.get('/logout', (req, res) => {
	req.logout();
	res.json('User signed out');
})

// Show user groups
router.get("/:user_id/groups", (req, res) => {
	User.findById(req.params.user_id).populate("groups").exec()
	.then(user => res.json(user))
	.catch(err => res.json(err))
})

// Search users
router.post('/users', (req, res) => {
	const { members, search } = req.body
	const regex = new RegExp(escapeRegex(search), 'gi');
	User.find({ username: regex })
	.then(foundUsers => {
		const filteredUsers = (
			foundUsers.filter((user) => {
				const isMember = (
					members.some(member => {
						return member._id == user._id
					})
				)
				return !isMember
			})
		)
		res.json(filteredUsers);
	}).catch(err => res.json(err))
})

module.exports = router