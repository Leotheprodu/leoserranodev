---
title: 'Install React from scratch with vite and eslint'
description: 'How to create react project from scratch with vite and Javascript vanilla.'
pubDate: 'Sep 20 2023'
heroImage: 'https://img.freepik.com/foto-gratis/encendido-computadora-portatil-gris_400718-47.jpg?w=1380&t=st=1695268630~exp=1695269230~hmac=53d48e1729c21c7e1fbce5150db676e94231ea12b0f810b814bc702cf6d56979'
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
