const handleSignIn=( db)=>(req,res)=>{
	const {email, password}=req.body;
	if(!email || !password){
		return res.status(400).json('incorrect form submission')
	}
	db.select('email', 'hash').from('login')
	.where('email','=', email)
	.then(data=>{
		//bcrypt.compare(password, data[0].hash, (error,result)=>{
		let res = password===data[0].hash? true:false

			if(!res)
				console.log(error)
			else{
				if(res){
					return db.select('*').from('users')
					.where('email','=', email)
					.then(user=>{
						res.json(user[0])
					})
					.catch(err=>res.status(400).json('Unable to get user'))
					
				}
				else{
					 res.status(400).json('Unable to get user');
				}
			}
				
			
		});
		
	//})
	//.catch(err=>res.status(400).json('wrong credentials'))
}

module.exports={
	handleSignIn
}