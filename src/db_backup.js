require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@blok-tech-qwrn1.azure.mongodb.net/`
const client = new MongoClient(DB_URI, { useUnifiedTopology: true })

// async function connect(callbackFunction) {
// 	try {
// 		await client.connect()
// 		const db = client.db(DB_NAME)
// 		await callbackFunction(db)
// 	} catch (error) {
// 		console.error(error)
// 		await client.close()
// 	}
// }

// async function get({
// 	collection = 'users',
// 	query = {},
// 	limit = 0,
// 	toArray = true
// }) {
// 	// connect(async (db) => {
// 	// 	console.log(db)
// 	// 	const data = await db.collection(collection).find().toArray()
// 	// 	console.log(data[0]['_id'])
// 	// 	return data
// 	// })

// }

// // client.connect((err, client) => {
// // 	if (err) {
// // 		throw err
// // 	}

// // 	client
// // 		.db(DB_NAME)
// // 		.collection('users')
// // 		.find({ dob: { age: { $lt: 30 } } })
// // 		.limit(100)
// // 		.toArray((err, docs) => {
// // 			if (err) {
// // 				throw err
// // 			}
// // 			users = docs
// // 			console.log(users)
// // 			client.close()
// // 		})
// // }

// module.exports = {
// 	connect,
// 	get,
// }
