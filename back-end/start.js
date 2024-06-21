// This script is a workaround so i can have path aliases, which only cost me 1,5 days and a good portion of my sanity to figure out.
const tsConfigPaths = require('tsconfig-paths');
const path = require('path');

const baseUrl = path.resolve(__dirname, 'dist');
const cleanup = tsConfigPaths.register({
  baseUrl,
  // These paths should match the ones in the TS config
  paths: {
    "#model/*": ["domain/model/*"],
    "#data-acces/*": ["domain/data-acces/*"],
    "#service/*": ["service/*"],
    "#controller/*": ["controller/*"],
    "#util/*": ["util/*"]
}
});

// After registering tsconfig-paths, require the compiled entry point
require('./dist/app.js');

// Optionally, cleanup when done
cleanup();