// Module imports
const { useRouter } = require('next/router')

module.exports = () => {
	const Router = useRouter()

	if (process.env.gitInfo) {
		return process.env.gitInfo.pages[Router.route]
	}

	return {}
}
