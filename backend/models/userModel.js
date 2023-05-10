const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema


const userSchema = new Schema({
	email:{
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String, 
		required: true
	}
})

//Making static signup method
//Use regular function 
userSchema.statics.signup = async function(email, password) {

	// Install VALIDATOR npm i validator
	// Doing Validation Like Email is valid or not or password is strong enough
	if (!email || !password){
		throw Error('All fields must be filled')
	}

	if (!validator.isEmail(email)){
		throw Error('Email is not Valid')
	}

	if (!validator.isStrongPassword(password)){
		throw Error('Password not strong enough')
	}  



	//Checking if email already exists
	const exists = await this.findOne({ email })
	if (exists) {
		throw Error('Email already in use.')
	}

	//For hashing install bcrypt
	//Salting means creating different hash for same password
	const salt = await bcrypt.genSalt(10) // Higher the number higher the security
	const hash = await bcrypt.hash(password, salt)

	// Creating and storing user
	const user = await this.create({
		email: email,
		password: hash
	})

	return user
}


// Static login method
userSchema.statics.login = async function(email, password){
	if (!email || !password){
		throw Error('All fields must be filled')
	}

	const user = await this.findOne({ email })
	if (!user) {
		throw Error('Incorrect Email')
	}

	const match = await bcrypt.compare(password, user.password)
	if (!match){
		throw Error('Incorrect password')
	}

	return user
}



module.exports = mongoose.model('User', userSchema)