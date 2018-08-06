const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '90974e012358409aa145fc2052d9553d'
});

const handleApiCall = (req, res) => {
	app.models
	    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	    .then(data => {
	    	res.json(data)
	    })
	    .catch(err => res.json("Unable to connect to Api"))
}


const handleImage = (req, res, db) => {
	const { id } = req.body;
	 db('users').where('id', '=' , id)
	 .increment('entries', 1)
	 .returning('entries')
	 .then(user => {
	 	 res.json(user[0]);
	 })
	 .catch(err => res.status(400).json('unable to get entries'));
}


module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}