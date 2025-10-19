import type { SandpackFiles } from '@codesandbox/sandpack-react';

export const defaultFiles: SandpackFiles = {
  '/App.js': `import React from 'react';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <h1 className="font-headline">Welcome to CipherStudio!</h1>
      <h2>Start editing to see your project live.</h2>
    </div>
  );
}`,
  '/styles.css': `body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #1e1e1e;
  color: white;
  padding: 20px;
}

.font-headline {
    font-family: 'Space Grotesk', sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #29ABE2;
  font-weight: 700;
}

h2 {
  font-size: 1.5rem;
  color: #FF9933;
  font-weight: 400;
}
`,
  '/index.js': `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  '/package.json': `{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "^5.0.0"
  },
  "main": "/index.js"
}`,
};
