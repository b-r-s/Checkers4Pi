const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Disable Expo Router since we're using React Navigation
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// Exclude Pi Network file from React Native builds (uses Node.js modules)
config.resolver.blockList = [
  /.*\/packages\/shared\/hooks\/usePiNetwork\.ts$/,
];

// Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Support for TypeScript files and shared package
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

// Support for shared package
config.resolver.extraNodeModules = {
  '@ai-checkers/shared': path.resolve(workspaceRoot, 'packages/shared'),
};

// Add shared assets path
config.resolver.assetExts = [...config.resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif', 'svg'];

// Ensure we resolve to the actual files, not the package.json main field
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@ai-checkers/shared') {
    return {
      filePath: path.resolve(workspaceRoot, 'packages/shared/index.ts'),
      type: 'sourceFile',
    };
  }
  // Handle shared assets
  if (moduleName.startsWith('@ai-checkers/shared/assets/')) {
    const assetPath = moduleName.replace('@ai-checkers/shared/', '');
    return {
      filePath: path.resolve(workspaceRoot, 'packages/shared', assetPath),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
