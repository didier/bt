// Load environment variables into `process.env`
require('dotenv').config()

// Require packages
const MongoClient = require('mongodb').MongoClient

const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME } = process.env

// Construct URI based on `.env`
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`

const connect = async () =>
	MongoClient.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).catch((err) => {
		throw err
	})

/**
 * Read data from the database
 * @function Read
 * @param {Object} options - The options to pass to the function
 * @param {String} options.collection - The name of the collection
 * @param {{}} options.query - The query to execute on the collection
 * @param {Number} options.amount - The amount of results to return
 * @returns A promise that resolves with the data
 */
async function Read({ collection = '', query = {}, amount = 0 }) {
	// Connect to the database
	const client = await connect()

	try {
		// Fetch the response
		const response = await client.db(DB_NAME).collection(collection).find(query).limit(amount).toArray()

		// Return the response
		return response
	} catch (err) {
		// Catch and throw an error if it occurs
		throw err
	} finally {
		// Close connection to the client
		client.close()
	}
}

/**
 * Create data in the database
 * @function Create
 * @param {Object} options - The options to pass to the function
 * @param {String} options.collection - The name of the collection
 * @param {{}} options.data - The data to create
 */
async function Create({ collection = '', data = {} }) {
	// Connect to the database
	const client = await connect()

	try {
		// Fetch the response
		if (Array.isArray(data) === true) {
			await client.db(DB_NAME).collection(collection).insertMany(data)
		} else {
			await client.db(DB_NAME).collection(collection).insertOne(data)
		}

		// Return the response
		return
	} catch (err) {
		// Catch and throw an error if it occurs
		throw err
	} finally {
		// Close connection to the client
		client.close()
	}
}

/**
 * Update data in the database
 * @function Update
 * @param {Object} options - The options to pass to the function
 * @param {String} options.collection - The name of the collection
 * @param {{}} options.query - The query to execute on the collection
 * @param {{}} options.data - The data to update
 */
async function Update({ collection = '', query = {}, data = {}, single = true }) {
	// Check if data is not empty
	if (!data || data === {}) {
		throw new Error(`Can't update data with empty data. If you want to remove data, use the delete function.`)
	}
	// Connect to the database
	const client = await connect()
	try {
		// Check if data is an arroy or an object
		if (single !== true) {
			await client.db(DB_NAME).collection(collection).updateMany(query, data)
		} else {
			await client.db(DB_NAME).collection(collection).updateOne(query, data)
		}
		if (process.env.NODE_ENV === 'debug') {
			console.log(`Set data to ${JSON.stringify(data)}`)
		}
		// Return the response
		return
	} catch (err) {
		// Catch and throw an error if it occurs
		throw err
	} finally {
		// Close connection to the client
		client.close()
	}
}

/**
 * Delete data from the database
 * @function Delete
 * @param {Object} options - The options to pass to the function
 * @param {String} options.collection - The name of the collection
 * @param {{}} options.query - The query to execute on the collection
 * @param {{}} options.data - The data to delete
 */
async function Delete({ collection = '', query = {}, data = {}, singe = true }) {
	// Connect to the database
	const client = await connect()

	try {
		// Check if data is an arroy or an object
		if (single !== true) {
			await client
				.db(DB_NAME)
				.collection(collection)
				// .find(query)
				.deleteMany(query, data)
		} else {
			await client
				.db(DB_NAME)
				.collection(collection)
				// .find(query)
				.deleteOne(query, data)
		}

		// Return the response
		return
	} catch (err) {
		// Catch and throw an error if it occurs
		throw err
	} finally {
		// Close connection to the client
		client.close()
	}
}

module.exports = {
	Create,
	Read,
	Update,
	Delete,
}
