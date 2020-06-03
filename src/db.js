require('dotenv').config({ path: '../.env' })
const mongo = require('mongodb').MongoClient
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@blok-tech-qwrn1.azure.mongodb.net/`
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}
let db
mongo.connect(DB_URI, options, (err, client) => {
	if (err) {
		console.error(err)
		return
	}

	db = client.db(DB_NAME)

	const users = db.collection('users')

	// async function get(collectionName, callback) {
	// 	const data = await db.collection(collectionName)
	// 	callback(data)
	// }

	// get('users', (data) => data.find().toArray((err, items) => items))
	// get('users', (data) => data.find().toArray((err, items) => items))
	module.exports = { db }
})

// async function get(collection, query) {
// 	let db, client
// 	try {
// 		client = await client.connect()
// 		db = client.db(DB_NAME)
// 		return await db.collection(collection).find(query).toArray()
// 	} finally {
// 		client.close()
// 	}
// }

// get('users', {})

// const connectToDatabase = async (callback) => {

// 	await client.connect((err, client) => {
// 		if (err) { throw err } else {
// 			console.log(`Connected to database '${DB_NAME}'`)

// 			const db = client.db(DB_NAME)
// 			callback(db)
// 		}
// 	})
// }

// const getCollection = async () => {
// 	connectToDatabase().then((res) => {
// 		client.close()

// 		res.json(res)

// 	})
// }
// connectToDatabase(console.log)

// async function getUsers(db) {
// 	console.log(users)
// }

// async function getCollection(collection = 'users') {
// 	await connectToDatabase(async (db) => {
// 		const data = await db.collection(collection)
// 			.find()
// 			.toArray()

// 		// console.log()

// 		return data
// 		// .then(data => {
// 		// })
// 		// .then(data => {
// 		// 	return data
// 		// })
// 		// .catch(error => console.error(error))
// 	})
// }

// const users = getCollection('users')
// console.log(users)
