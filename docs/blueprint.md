# **App Name**: CipherStudio

## Core Features:

- File Management: Enable users to create, delete, and organize project files within the IDE.
- Code Editor: Integrate Monaco Editor or Sandpack to provide a rich code editing experience with syntax highlighting and autocompletion for React components.
- Live Preview: Display the React project output in real-time as the code changes, allowing users to see live updates of their work.
- Save Project: Enable users to save the current state of their project to MongoDB, including all files and code, associated with a projectId.
- Load Project: Allow users to load previously saved projects from MongoDB by entering the projectId, restoring all files and code to their last saved state.
- Theme Switcher: Implement a theme switcher (dark/light) in settings using localStorage

## Style Guidelines:

- Primary color: Use a vibrant blue (#29ABE2) to evoke a sense of innovation and technology.
- Background color: Light gray (#F5F5F5) for a clean and modern workspace.
- Accent color: A complementary orange (#FF9933) to highlight important interactive elements, such as buttons.
- Headline font: 'Space Grotesk' sans-serif font for headings, lending a techy and modern feel; body text: 'Inter', a grotesque sans-serif for longer text
- Code font: 'Source Code Pro' for displaying code snippets within the editor.
- Use a set of consistent and clear icons to represent file actions (create, delete, save) and project settings.
- Divide the IDE into three main sections: file explorer, code editor, and live preview. Each section should be clearly delineated but also easily resizable.