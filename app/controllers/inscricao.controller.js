const Inscricao           = apprequire('models/inscricao.model')
const Errors                = apprequire('helpers/errors.helper')
const ErrorHandler          = apprequire('helpers/error-handler.helper')


class InscricaoController {
    constructor(){}

    new(req, res) {
		let body = req.body
         var date = Date()
        body.data_inscricao = this.formatDate(date)
        let inscricao = new Inscricao()
		inscricao.novaInscricao(body)
		.then(saved => res.status(200).json(saved))
		.catch(err => ErrorHandler.toRequest(err, res))
	}

    get(req, res) {
		let doc = req.params.documento
        console.log(doc)
        Inscricao.getInscricaoByDoc(doc)
        .then(result => res.status(200).json(result))
        .catch(err => ErrorHandler.toRequest(err, res))
	}

    edit(req, res) {
		let groupId = req.params.groupId
		let group = req.body

		Group.findById(groupId)
			.then(groupFound => {
				if (!groupFound) throw new Error.NotFound()
				Abilities.can(user, 'edit', groupFound)
			})
			.then(groupFound => User.replaceUidsWithUsers(group.owners))
			.then(owners => {
				group.owners = owners
				return Group.findByIdAndUpdate(groupId, group).exec()
			})
			.then(edited => res.status(200).json(edited))
			.catch(err => ErrorHandler.toRequest(err, res))
	}

    formatDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}

module.exports = InscricaoController;
