const Order = require("./models/Order");
const mongoose = require("mongoose");


const dbConnection = async() => {
	try {
		await mongoose.connect('mongodb+srv://MEAN_USER:nbLah4hEp7wVKsCf@cluster0.edevloe.mongodb.net/test', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("Base de datos: On");
	} catch (error) {
		console.log(error);
		throw new Error('Error al inicializar la base de datos');
	}
}

async function asyncCall() {
	try{
		await dbConnection()

		const e = await Order.find({isWithdrawl:{ $exists: false }})
		console.log(e)
		await e.map(async (user, index) => {
			try {
				const newU = await Order.findById(user.id)
				newU.isWithdrawl = false
				newU.save().then(newUser => {
					console.log(newUser)
					return newUser
				})
			} catch (e) {
				console.log(e)
			}
		})
		console.log(e)
	}catch (error) {
		console.log(error);
	}
}


// async function asyncCall() {
// 	try{
// 		await dbConnection()
//
// 		const e = await Usuario.find({sequenceId:{ $exists: true }})
// 		await e.map(async (user, index) => {
// 			try {
// 				const newU = await Usuario.findById(user.id)
// 				newU.sequenceId = newU.sequenceId + 10000
// 				newU.save().then(newUser => {
// 					console.log(newUser)
// 					return newUser
// 				})
// 			} catch (e) {
// 				console.log(e)
// 			}
// 		})
// 		console.log(e)
//
//
// 	}catch (error) {
// 		console.log(error);
// 	}
// }

// const getSortedUser = async ()  => {
// 	try{
// 		await dbConnection()
//
// 		const e = await Usuario.findOne({sequenceId:{ $exists: true }}).sort({sequenceId : -1})
// 		console.log(e.sequenceId)
//
// 	}catch (error) {
// 		console.log(error);
// 	}
// }
//
// getSortedUser()

asyncCall()
