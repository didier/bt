const MongoClient = require('mongodb').MongoClient
const { ObjectId } = require('mongodb')
const { DB_URI, DB_NAME } = process.env
const client = new MongoClient(DB_URI, { useUnifiedTopology: true })

function connect({ name = 'users', query = {} }, callback) {
	client.connect((err, client) => {
		if (err) {
			throw err
		}
		client
			.db(DB_NAME)
			.collection(name)
			.find(query)
			// .find()
			.limit(100)
			.toArray((err, docs) => {
				if (err) {
					throw err
				}
				callback(docs)
				client.close()
			})
	})
}

module.exports = { connect }
