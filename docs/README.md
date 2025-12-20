# Checkers4Pi 🎮

A responsive, mobile-ready AI Checkers game built for the Pi Network ecosystem.

## Features

- 🎨 **Beautiful, Responsive Design** - Works perfectly on mobile and desktop browsers
- 🤖 **3 AI Difficulty Levels** - Beginner, Intermediate, and Advanced
- 🎭 **Customizable Themes** - Multiple piece colors and board styles
- 📊 **Real-time Scoring** - Advanced scoring system tracking material, power, and strategy
- 💫 **Smooth Animations** - Polished UI with drag-and-drop support
- 🔊 **Sound Effects** - Audio feedback for moves, jumps, and king promotions
- 💎 **Pi Network Integration** - Ready for Pi Browser and Pi SDK integration

## Getting Started

### Prerequisites

- Node.js 18+ or npm
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app will run at `http://localhost:5173` by default.

## Project Structure

```
checkers4pi/
├── src/
│   ├── components/       # React components
│   │   ├── Board/       # Game board component
│   │   ├── CheckerPiece/  # Checker piece component
│   │   ├── Sidebar/     # Settings and controls
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   │   ├── useAI.ts     # AI logic
│   │   ├── useGameState.ts  # Game state management
│   │   ├── usePiNetwork.ts  # Pi SDK integration
│   │   └── ...
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   │   ├── gameLogic.ts   # Core game rules
│   │   ├── scoring.ts     # Scoring system
│   │   └── ...
│   ├── assets/          # Images and static files
│   └── App.tsx          # Main app component
└── index.html          # Entry HTML file
```

## Pi Network Integration

This app is designed to work seamlessly with Pi Browser and includes Pi SDK integration for:
- User authentication
- Payment processing
- Pi Network features

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Pi SDK** - Pi Network integration

## License

MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
