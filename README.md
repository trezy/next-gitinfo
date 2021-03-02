# @trezy/next-gitinfo

This library makes it trivial to retrieve Git information for files in your Next.js application.

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
npm install --save-dev @trezy/next-gitinfo
# or
yarn add --dev @trezy/next-gitinfo
```

# Usage

## `withGitInfo`

The `withGitInfo` library extends your Next config to include Git information in your builds. To use it, you must install it in your `next.config.js` file:

```js
// Module imports
const withGitInfo = require('@trezy/next-gitinfo')

module.exports = withGitInfo()
```

Alternatively, if you already have other Next configuration, you can pass it directly into `withGitInfo`:

```js
// Module imports
const withGitInfo = require('@trezy/next-gitinfo')

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
import { useCurrentPageGitInfo } from '@trezy/next-gitinfo/hooks'

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
