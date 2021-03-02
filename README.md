<div align="center">
  <h1><code>next-gitinfo</code></h1>

  <p>Make it trivial to retrieve Git information for files in your Next.js application.</p>

  <hr />
</div>

[![Version][version-badge]][package]
[![BSD-3-Clause License][license-badge]][license]
[![Downloads][downloads-badge]][npmtrends]
[![Bundle size][bundlephobia-badge]][bundlephobia]

<!-- [![Code Coverage][coveralls-badge]][coveralls] -->
[![Build status][build-status-badge]][build-status]
[![Dependencies][daviddm-badge]][daviddm]
[![Maintainability][codeclimate-badge]][codeclimate]

[![Code of Conduct][code-of-conduct-badge]][code-of-conduct]
[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
  - [withGitInfo](#withGitInfo)
  - [useCurrentPageGitInfo](#useCurrentPageGitInfo)
- [How it works](#how-it-works)

# Motivation

There are lots of reasons to want to know when and why a page was changed. Perhaps your Next site serves a Wiki, updateable through Git. Maybe you want to create a [`/version`](https://trezy.com/version) page to keep track of what has been deployed in each environment. Maybe you use Markdown files for your blog articles, and want to show the last time that an article was updated.

No matter what your reason, having access to the Git information for a specific page in your Next.js page can be extremely valuable, though getting access to that info is a serious pain-in-the-butt.

This library provides Git information for every page in your Next app to be used however you see fit. It also provides hooks to easily access that information in each page.

# Installation

```bash
npm install --save-dev next-gitinfo
# or
yarn add --dev next-gitinfo
```

# Usage

## `withGitInfo`

The `withGitInfo` library extends your Next config to include Git information in your builds. To use it, you must install it in your `next.config.js` file:

```js
// Module imports
const withGitInfo = require('next-gitinfo')

module.exports = withGitInfo()
```

Alternatively, if you already have other Next configuration, you can pass it directly into `withGitInfo`:

```js
// Module imports
const withGitInfo = require('next-gitinfo')

module.exports = withGitInfo({
	env: {},
	webpack: config => {
		return config
	},
})
```

Restarting your Next server will yield a new `process.env.gitInfo` variable that is available across your entire application.

```jsx
// pages/version.js

export default VersionPage() {
	return (
		<pre>
			{JSON.stringify(process.env.gitInfo, null, 2)}
		</pre>
	)
}
```

## `useCurrentPageGitInfo`

The `useCurrentPageGitInfo` hook allows you to retrieve the git info for the current page. This even works for dynamic pages.

```jsx
// pages/index.js
import { useCurrentPageGitInfo } from 'next-gitinfo/hooks'

export default VersionPage() {
	const gitInfo = useCurrentPageGitInfo()
	return (
		<pre>
			{JSON.stringify(gitInfo, null, 2)}
		</pre>
	)
}
```

# How it works

When starting your Next app, the `withGitInfo` library walks your `pages/` directory. For each page file that it finds, it will get a raw Git commit and parse that commit into a readable object. That object is then injected into the app as `process.env.gitInfo`.

To get Git info for current page, the `useCurrentPageGitInfo` hook uses the Next.js router to determine the page currently being viewed, then pulls the data from `process.env.gitInfo.pages` for that page.

***NOTE:*** `withGitInfo` only runs at compile time. This means that if you commit a file, `process.env.gitInfo` will not be updated until you restart the Next server.





[bundlephobia]: https://bundlephobia.com/result?p=next-gitinfo
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/next-gitinfo.svg?style=flat-square
[build-status]: https://github.com/trezy/next-gitinfo/actions
[build-status-badge]: https://img.shields.io/github/workflow/status/trezy/next-gitinfo/Release?style=flat-square
[code-of-conduct]: CODE_OF_CONDUCT.md
[code-of-conduct-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[codeclimate]: https://codeclimate.com/github/trezy/next-gitinfo
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/trezy/next-gitinfo.svg?style=flat-square
[coveralls]: https://coveralls.io/github/trezy/next-gitinfo
[coveralls-badge]: https://img.shields.io/coveralls/trezy/next-gitinfo.svg?style=flat-square
[daviddm]: https://david-dm.org/trezy/next-gitinfo
[daviddm-badge]: https://img.shields.io/david/dev/trezy/next-gitinfo.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/next-gitinfo.svg?style=flat-square
[github-watch]: https://github.com/trezy/next-gitinfo/watchers
[github-watch-badge]: https://img.shields.io/github/watchers/trezy/next-gitinfo.svg?style=social
[github-star]: https://github.com/trezy/next-gitinfo/stargazers
[github-star-badge]: https://img.shields.io/github/stars/trezy/next-gitinfo.svg?style=social
[license]: LICENSE
[license-badge]: https://img.shields.io/npm/l/next-gitinfo.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/next-gitinfo
[package]: https://npmjs.com/package/next-gitinfo
[prs]: CONTRIBUTING.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20next-gitinfo%20by%20%40TrezyCodes%20https%3A%2F%2Fgithub.com%2Ftrezy%2Fnext-gitinfo%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/trezy/next-gitinfo.svg?style=social
[version-badge]: https://img.shields.io/npm/v/next-gitinfo.svg?style=flat-square
