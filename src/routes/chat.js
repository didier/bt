// Server side chat function

const { Create, Read } = require('../db')
const { ObjectId } = require('mongodb')

const getChat = async (req, res) => {


	const user = await Read({
		collection: 'users',
		query: {
			_id: ObjectId(req.params.userId)
		}
	})

	const roomId = [req.session.user._id, req.params.userId].sort().toString().replace(',', '')

	console.log('roomId :>>', roomId);

	const chatData = await Read({
		collection: 'chats',
		query: { _id: roomId }
	})

	console.log(chatData);


	if (chatData.length === []) {
		await Create({
			collection: 'chats',
			data: {
				_id: roomId,
				messages: []
			}
		})
	}

	const chats = chatData[0].messages

	console.log(chats)

	res.status(200).render('chat', { user: user[0], roomId, loggedInUser: req.session.user, chats })
}

module.exports = { getChat }
