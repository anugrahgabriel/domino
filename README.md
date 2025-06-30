# 🎯 Domino Window - React TypeScript

A draggable retro-style window component built with React TypeScript, featuring automated deployment to GitHub Pages.

## 🚀 Live Demo

**[https://anugrahgabriel.github.io/domino/](https://anugrahgabriel.github.io/domino/)**

## ✨ Features

- 🖱️ **Draggable Window** - Click and drag the title bar to move the window
- 🎨 **Retro Windows Design** - Classic 90s Windows aesthetic with borders and shadows
- 📐 **Large Display** - 1000x800px window on black background
- ❌ **Working Close Button** - Click × to hide the window
- 📱 **Responsive Constraints** - Window stays within viewport boundaries
- 🔒 **TypeScript** - Full type safety and modern development experience

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **CSS3** - Custom styling with backdrop filters
- **GitHub Actions** - Automated CI/CD pipeline
- **GitHub Pages** - Static site hosting

## 🔄 Automated Deployment

### Every commit to `main` automatically:

1. ✅ **Builds** the React TypeScript app
2. ✅ **Tests** for type errors and build issues  
3. ✅ **Deploys** to GitHub Pages
4. ✅ **Updates** the live site

### Workflows:

- **Deploy** (`.github/workflows/deploy.yml`) - Builds and deploys on push to main
- **CI** (`.github/workflows/ci.yml`) - Runs tests and type checking on PRs
- **Dependabot** (`.github/dependabot.yml`) - Weekly dependency updates

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Type check
npm run type-check

# Run tests
npm test
```

## 📁 Project Structure

```
domino/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml      # Auto-deployment
│   │   └── ci.yml         # CI testing
│   └── dependabot.yml     # Dependency updates
├── public/
│   └── index.html         # HTML shell
├── src/
│   ├── DominoWindow.tsx   # Main draggable window
│   ├── DominoWindow.css   # Window styling  
│   ├── App.tsx           # Root component
│   ├── App.css          # Global styles
│   └── index.tsx        # React entry point
├── package.json         # Dependencies & scripts
└── tsconfig.json       # TypeScript config
```

## 🎮 Usage

The window component is fully self-contained:

```tsx
import DominoWindow from './DominoWindow';

function App() {
  return (
    <div className="App">
      <DominoWindow onClose={() => console.log('Window closed')} />
    </div>
  );
}
```

## 🔧 Configuration

### Window Properties:
- **Size**: 1000×800 pixels
- **Position**: Left side of viewport  
- **Background**: Solid white with blur effect
- **Font**: Courier New monospace
- **Draggable**: Via title bar only

### Deployment Settings:
- **Homepage**: `https://anugrahgabriel.github.io/domino`
- **Build Path**: `/build`
- **Deploy Branch**: `gh-pages`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Automated processes will:
- ✅ Run type checking and tests
- ✅ Build the app to verify changes
- ✅ Deploy automatically when merged to main

## 📜 License

This project is open source and available under the MIT License.

## 🚀 Deployment Status

[![Deploy](https://github.com/anugrahgabriel/domino/actions/workflows/deploy.yml/badge.svg)](https://github.com/anugrahgabriel/domino/actions/workflows/deploy.yml)
[![CI](https://github.com/anugrahgabriel/domino/actions/workflows/ci.yml/badge.svg)](https://github.com/anugrahgabriel/domino/actions/workflows/ci.yml) 