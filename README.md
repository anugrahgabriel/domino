Word to pattern 3d domino

a draggable retro-style window component built with React TypeScript, featuring automated deployment to GitHub Pages.

Live Demo

[https://anugrahgabriel.github.io/domino/](https://anugrahgabriel.github.io/domino/)

Features

- Draggable Window** - Click and drag the title bar to move the window
- Retro Windows Design** - Classic 90s Windows aesthetic with borders and shadows
- Large Display** - 1000x800px window on black background
- Working Close Button** - Click × to hide the window
- Responsive Constraints** - Window stays within viewport boundaries
- TypeScript** - Full type safety and modern development experience

Tech Stack

- React 18*- Modern React with hooks
- TypeScript - Type-safe development
- CSS3 - Custom styling with backdrop filters
- GitHub Actions - Automated CI/CD pipeline
- GitHub Pages - Static site hosting



Workflows:

- **Deploy** (`.github/workflows/deploy.yml`) - Builds and deploys on push to main
- **CI** (`.github/workflows/ci.yml`) - Runs tests and type checking on PRs
- **Dependabot** (`.github/dependabot.yml`) - Weekly dependency updates

Local Development

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

Project Structure

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

License

This project is open source and available under the MIT License.