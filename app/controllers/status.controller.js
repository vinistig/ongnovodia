
class Status {
	constructor() {}

	index(req, res) {
		res.status(200).json({quem: "its alive"})
	}
}

module.exports = Status
