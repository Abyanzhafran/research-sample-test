const { performance } = require("perf_hooks");
const depcheck = require("depcheck");
const options = {
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: true, // skip calculation of missing dependencies
  ignoreDirs: [
    /*
      ignore node_modules directory, even it's little bit confusing.
      When you look inside constants.js file, node_modules already ignored
      , inside ignorePattern field by defaultOption
    */
    "node_modules",
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    "jest",
    "eslint",
    "babel-*",
  ],
};

const start = performance.now();
depcheck(__dirname, options, (unused) => {
  const end = performance.now();
  console.log("unusedDependencies:", unused.dependencies);
  console.log("unusedDevDependencies:", unused.devDependencies);
  console.log(`Time taken: ${(end - start).toFixed(2)} milliseconds`);
});
