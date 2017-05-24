const User        = apprequire('models/user.model.js')
const Session     = apprequire('models/session.model.js')
const Errors      = apprequire('helpers/errors.helper')
const ErrorHandler = apprequire('helpers/error-handler.helper')

class LoginController {
	constructor() {}

	login(req, res) {
		User.verifyUserAndPassword(req.body)
		.then(user => res.status(200).json(user))
		.catch(err => ErrorHandler.toRequest(err, res))

		// User.getOrUpdateFromUid(login.uid)
		// .then(user => Promise.all([
		// 	this._canLoginToApp(user),
		// 	user
		// ]))
		// .then(query => {
		// 	let hasPermission = query[0]
		// 	let user = query[1]
		//
		// 	return Promise.all([
		// 		user,
		// 		User.getPermissionsFor(user),
		// 		Session.createFromUid(login.uid, 'mobile')
		// 	])
		// })
		// .then(query => {
		// 	let user        = query[0]
		// 	let permissions = query[1]
		// 	let session     = query[2]
		// 	let response    = {
		// 		kalturaId:   user.id,
		// 		email:       user.email,
		// 		uid:         user.uid,
		// 		name:        user.name,
		// 		token:       session.token,
		// 		permissions: permissions
		// 	}
		//
		// 	res.status(200).json(response)
		// })
		// .catch(err => ErrorHandler.toRequest(err, res))
	}

	admin(req, res) {
		let login = User.mapLdapUser(req.user)

		// TODO: Return permissions
		User.getOrUpdateFromUid(login.uid)
		.then(user => this._canAdmin(user))
		.then(user => Promise.all([
			Session.createFromUid(login.uid, 'admin'),
			User.getPermissionsFor(user),
			user
		]))
		.then(query => {
			let session       = query[0]
			let permissions = query[1]
			let user        = query[2]
			let response    = {
				email:       user.email,
				uid:         user.uid,
				name:        user.name,
				token:       session.token,
				permissions: permissions
			}

			res.status(200).json(response)
		})
		.catch(err => ErrorHandler.toRequest(err, res))
	}

}

module.exports = LoginController;
