
// Module imports
const { exec } = require('child_process')
const fs = require('fs')
const klaw = require('klaw-sync')
const path = require('path')

function parseUser(userString) {
	const [, name, email] = /^(.+) <(.+@.+)>$/.exec(userString)
	return {
		email,
		name,
	}
}

module.exports = (nextConfig = {}) => {
	const gitInfo = {
		pages: {},
	}
	let pagesDirectory = path.resolve(process.cwd(), 'src', 'pages')

	try {
		fs.readdirSync(pagesDirectory)
	} catch (error) {
		pagesDirectory = path.resolve(process.cwd(), 'pages')
	}

	// Use klaw-sync since `next.config.js` isn't allowed to export an async
	// function.
	const files = klaw(pagesDirectory, { nodir: true })

	files.map(file => {
		// Relative path is important for the git ref.
		const relativePath = file.path
			.replace(process.cwd(), '')
			.replace(/^\//, '')

		// Naively convert file path to a route.
		const route = file.path
			.replace(pagesDirectory, '')
			.replace(path.extname(file.path), '')
			.replace(/index$/, '')

		// Run the git log command synchronously to get the date of the last
		// commit that included this file.
		const result = exec(`git log --format=raw -n 1 --no-merges ${relativePath}`, (error, stdout, stderr) => {
			let [, commitHash] = /^commit (.+)/mu.exec(stdout)
			let [, author, authorDate] = /^author (.+) (\d+) -\d{4}/mu.exec(stdout)
			let [, committer, committerDate] = /^committer (.+) (\d+) -\d{4}/mu.exec(stdout)
			let [, parentHash] = /^parent (.+)/mu.exec(stdout)
			let [, commitMessage] = /^ {4}(.*)/msu.exec(stdout)

			// Convert user information to an object so it doesn't need to be parsed
			// again later.
			author = parseUser(author)
			committer = parseUser(committer)

			// Convert dates from seconds to much more usable ISO strings.
			authorDate = new Date(authorDate * 1000).toISOString()
			committerDate = new Date(committerDate * 1000).toISOString()

			// Raw commit message lines are prefixed with 4 spaces, so we remove them.
			commitMessage = commitMessage.replace(/ {4}/gms, '')

			gitInfo.pages[route] = {
				author,
				authorDate,
				commitHash,
				commitMessage,
				committer,
				committerDate,
				filename: relativePath,
				parentHash,
			}
		})

		return gitInfo
	})

	// Set gitInfo as an environment variable so we can access it from anywhere.
	return Object.assign({}, nextConfig, {
		env: { gitInfo },
	})
}
