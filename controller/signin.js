const handleSignin = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	if (!email  || !password) {
		return res.status(400).json('Incorrect form Submission')
	}

	 db.select('email','hash').from('login')
	 .where('email', '=', req.body.email)
	 .then(data => {
	 	const isValid = bcrypt.compareSync( password, data[0].hash);
	    
	 	if (isValid) {
	 		return db.select('*').from('users')
	 		  .where('email', '=',  email)
	 		  .then(user => {
	 		  	res.json(user[0])
	 		  })
	 		  .catch(err => res.status(400).json('unable to get users'))	
	 	 }else{
	 	 	
	 	 	res.status(400).json('Wrong Credentials');
	 	 }
	 	 
	 })
	  .catch(err => res.status(400).json('wrong credential'))
}

module.exports = {
	handleSignin: handleSignin
}