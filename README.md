# create-atomikjs

The official CLI tool for creating new [AtomikJS](https://github.com/Valogzi/atomik) projects.

## Quick Start

```bash
npx create-atomikjs my-app
cd my-app
npm run dev
# or
npm create atomikjs@latest my-app
```

## About AtomikJS

AtomikJS is an ultra-fast web framework designed for maximum performance and developer experience. Create new AtomikJS projects instantly with this CLI tool.

## Usage

### Create a new project

```bash
npx create-atomikjs <project-name> [options]
```

### Options

- `--typescript` - Use TypeScript (default)
- `--javascript` - Use JavaScript instead of TypeScript

### Examples

```bash
# Create a TypeScript project (default)
npx create-atomikjs my-app

# Create a JavaScript project
npx create-atomikjs my-app --javascript

# Create a TypeScript project explicitly
npx create-atomikjs my-app --typescript
```

## What's Included

When you create a new project, you'll get:

- 🚀 Basic AtomikJS server setup
- 📝 Sample routes (text, JSON, and HTML responses)
- 🛠️ Pre-configured build scripts
- 📦 Automatic dependency installation
- 🎯 TypeScript or JavaScript support

## Project Structure

```
my-app/
├── src/
│   └── index.ts        # Main application file
├── package.json        # Project configuration
└── tsconfig.json       # TypeScript configuration (TS projects only)
```

## Getting Started with Your New Project

After creating your project:

1. **Navigate to your project directory:**

   ```bash
   cd my-app
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:** Visit [http://localhost:5489](http://localhost:5489) to see your app running!

## Available Routes

Your new AtomikJS project comes with these sample routes:

- `GET /` - Returns a simple text response
- `GET /json` - Returns a JSON response
- `GET /html` - Returns an HTML response

## Package Manager Support

create-atomikjs automatically detects and uses your preferred package manager:

- 📦 **npm** (default)
- 🧶 **yarn**
- ⚡ **pnpm**

## Requirements

- Node.js 16.0 or later
- npm, yarn, or pnpm

## Author

## License

MIT © [Valogzi](https://github.com/valogzi)

## Learn More

- [AtomikJS Documentation](https://github.com/Valogzi/atomik)
- [AtomikJS Examples](https://github.com/Valogzi/Atomik/tree/main/src/exemples)

---

Made with ❤️ for the AtomikJS community
