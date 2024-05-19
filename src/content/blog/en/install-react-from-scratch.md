---
title: 'Install React and eslint with vite from scratch'
description: 'Learn how to create react project from scratch with Vite and Javascript vanilla.'
pubDate: 'Sep 20 2023'
heroImage: '/react.jpg'
categories:
    - 'React'
---

#### installation of dependencies

1. `npm create vite@latest`
2. `npm install @vitejs/plugin-react -E`
3. `npm install react react-dom -E`

#### First configuration:

Configuration in the Vite configuration file: <mark>vite.config.js</mark>

```javascript
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
});
```

#### Important

You can now change the file extensions from .js to.jsx. Make sure that the files where they are imported contain the jsx extension, for example, in the main HTML of the application.

##### Now install Eslint because it is important to start any project with this extension.

In package.json file add:

```json
"eslintConfig": {
	"extends": "./node_modules/standard/eslintrc.json"
}
```

npm install to install everything

and voila!, you have configured your project with React, vite and eslint from scratch.
