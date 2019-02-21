const express = require('express'),
router 		  = express.Router(),
User 		  = require('../database/models/user'),
passport      = require('passport');

// Add a new User to the database and login
router.post('/register', (req, res) => {
	const { username, password } = req.body;
	if(password.length > 3){
		const newUser = new User({username: username});
		User.register(newUser, password, (err, user) => {
			if (err) return res.send('This username is already registered')
			passport.authenticate('local')(req, res, () => {
				res.json(user);
			})
		});	
	} else res.send('Your password should be at least 4 characters long!')
});

// Login registered account
router.post('/login', passport.authenticate('local'), (req, res) => {
	const { username } = req.body;
	User.find({ username: username }, (err, user) => {
		console.log(user)
		if (err) return res.json(err);
		res.json(user);
	});
})

// Logout account
router.get('/logout', (req, res) => {
	req.logout();
	res.json('User signed out');
})

// Show user groups
router.get('/:user_id/groups', (req, res) => {
	User.findById(req.params.user_id).populate('groups').exec((err, user) => {
		if (err) return res.json(err);
		res.json(user);
	})
})

// Escape Regular Expressions (used when searching users to add to group)
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Search users
router.post('/users', (req, res) => {
	const { members, search } = req.body
	console.log(req.body)
	const regex = new RegExp(escapeRegex(search), 'gi');
	User.find({ username: regex }, (err, foundUsers) => {
		if(err) return err;
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
	})
})

module.exports = router