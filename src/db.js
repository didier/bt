const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')
const { DB_URI, DB_NAME } = process.env
const mongo = new MongoClient(DB_URI, { useUnifiedTopology: true })

function connect({ name = 'users', query = {} }, callback) {
	mongo.connect((err, client) => {
		if (err) {
			throw err
		}
		client
			.db(DB_NAME)
			.collection(name)
			.find(query)
			.limit(5)
			.toArray((err, docs) => {
				if (err) {
					throw err
				}
				callback(docs)
				// client.close()
			})
	})
}

function get({ name = 'users' }, callback) {
	mongo.connect(async (err, client) => {
		if (err) {
			throw err
		}

		const data = await client.db(DB_NAME).collection(name)
		callback(data, client)
	})
}

module.exports = {
	connect,
	get,
	mongo,
}
