"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const package_manager_1 = require("../utils/package-manager");
async function createProject(projectName, options) {
    console.log(`🎯 Creating new Atomik project: ${projectName}`);
    console.log(`📦 Language: ${options.javascript ? 'JavaScript' : 'TypeScript'}`);
    const projectPath = path.resolve(process.cwd(), projectName);
    // Check if directory already exists
    if (fs.existsSync(projectPath)) {
        console.error(`❌ Directory ${projectName} already exists!`);
        process.exit(1);
    }
    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });
    try {
        // Create project structure
        await createProjectStructure(projectPath, options);
        // Copy template files
        await copyTemplateFiles(projectPath, 'basic', options.javascript);
        // Initialize package.json
        await createPackageJson(projectPath, projectName, options);
        // Install dependencies
        const packageManager = (0, package_manager_1.detectPackageManager)(projectPath);
        (0, package_manager_1.installDependencies)(packageManager, projectPath);
        console.log('✅ Project created successfully!');
        const runCmd = packageManager.runCommand;
        console.log(`
🚀 Quick start:
   cd ${projectName}
   ${runCmd} dev

📚 Available commands:
   ${runCmd} dev     - Start development server
   ${runCmd} build   - Build for production  
   ${runCmd} start   - Start production server
		`);
    }
    catch (error) {
        console.error('❌ Error creating project:', error);
        // Clean up on error
        if (fs.existsSync(projectPath)) {
            fs.rmSync(projectPath, { recursive: true, force: true });
        }
        process.exit(1);
    }
}
async function createProjectStructure(projectPath, options) {
    const dirs = ['src', 'src/routes', 'src/middleware', 'src/utils', 'public'];
    dirs.forEach(dir => {
        fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
    });
}
async function copyTemplateFiles(projectPath, template, useJS) {
    const ext = useJS ? 'js' : 'ts';
    // Template files based on template type
    const files = getTemplateFiles(template, ext);
    for (const [filePath, content] of Object.entries(files)) {
        const fullPath = path.join(projectPath, filePath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, content);
    }
}
function getTemplateFiles(template, ext) {
    const isTS = ext === 'ts';
    const commonFiles = {
        [`src/index.${ext}`]: getMainTemplate(template, isTS),
        'README.md': getReadmeTemplate(),
        '.gitignore': getGitignoreTemplate(),
        ...(isTS && { 'tsconfig.json': getTsConfigTemplate() }),
    };
    return commonFiles;
}
function getMainTemplate(template, isTS) {
    const importType = isTS
        ? "import { Atomik, cors, serve } from 'atomikjs';"
        : "const { Atomik, cors, serve } = require('atomikjs');";
    return `${importType}

const app = new Atomik();

// Middleware
app.use(cors());

app.get('/', c => {
	return c.text('Hello, Atomik! 🚀 Bienvenue à Atomik! 你好 🌍');
});

app.get('/json', c => {
	return c.json({ 
		message: 'Hello from Atomik API!', 
		français: 'Bonjour depuis Atomik!',
		chinese: '你好来自 Atomik!',
		emoji: '🚀🌟💫'
	});
});

app.get('/html', c => {
	return c.html(\`
		<!DOCTYPE html>
		<html lang="fr">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Atomik - Framework Ultra-rapide</title>
		</head>
		<body>
			<h1>Bienvenue sur Atomik 🚀</h1>
			<p>Framework web ultra-rapide et léger</p>
			<p>支持 UTF-8 编码 ✨</p>
			<p>Émojis: 🌟💫⚡🔥</p>
		</body>
		</html>
	\`);
});

// if you want to use nodejs runtime
// serve({ app: app })

export default app;
`;
}
function getReadmeTemplate() {
    return `# Atomik Project

A new project created with Atomik CLI.

## Getting Started

\`\`\`bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
\`\`\`

## Project Structure

\`\`\`
src/
├── index.ts          # Main application file
├── routes/           # Route handlers
├── middleware/       # Custom middleware
└── utils/           # Utility functions

public/              # Static files
\`\`\`

## Learn More

- [Atomik Documentation](https://github.com/valogzi/atomik)
- [Atomik Examples](https://github.com/valogzi/atomik/tree/main/src/exemples)
`;
}
function getGitignoreTemplate() {
    return `node_modules/
dist/
build/
*.log
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
`;
}
function getTsConfigTemplate() {
    return `{
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"lib": ["ES2020"],
		"outDir": "./dist",
		"rootDir": "./src",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"declaration": true,
		"declarationMap": true,
		"sourceMap": true,
		"types": ["node"]
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules", "dist"]
}
`;
}
async function createPackageJson(projectPath, projectName, options) {
    const isTS = !options.javascript;
    const packageManager = (0, package_manager_1.detectPackageManager)(projectPath);
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: `A new Atomik project created with basic template`,
        main: isTS ? 'dist/index.js' : 'src/index.js',
        scripts: (0, package_manager_1.generateScripts)(packageManager, isTS),
        keywords: ['atomik', 'web', 'framework'],
        author: '',
        license: 'MIT',
        dependencies: {
            atomikjs: '^1.0.0',
        },
        devDependencies: (0, package_manager_1.generateDevDependencies)(packageManager, isTS),
        ...(packageManager.name !== 'npm' && {
            packageManager: `${packageManager.name}@latest`,
        }),
    };
    fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
}
