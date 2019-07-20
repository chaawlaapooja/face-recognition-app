const clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: 'd55634bf68374b27ba1c567bad1e65d2'
});

const handleApiCall=(req,res)=>{
	app.models
 	.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
 	.then(data=>{
 		res.json(data)
 	})
 	.catch(err=>res.status(400).json('unable to work with api'))
}

const handleImage = (req,res, db)=>{
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0])
	})
	.catch(err=>res.status(400).json('Unable to get entries'))

}
module.exports={
	handleImage,
	handleApiCall
}