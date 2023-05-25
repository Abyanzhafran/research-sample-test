const { performance } = require("perf_hooks");
const depcheck = require("depcheck");
const options = {
  skipMissing: true, // skip calculation of missing dependencies
  ignorePatterns: ["dist", ".gitignore"],
  ignoreDirs: [
    /*
      ignore node_modules directory, even it's little bit confusing.
      When you look inside constants.js file, node_modules already ignored
      , inside ignorePattern field by defaultOption.
      also ignore .gitignore file
    */
    "node_modules",
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    "jest-*",
    "eslint-*",
    "babel-*",
    "webpack-*",
  ],
};

console.log("Depcheck Result : \n");

const start = performance.now();

depcheck(__dirname, options, (unused) => {
  console.log("Unused dependencies : ", unused.dependencies);
  console.log("Unused devDependencies : ", unused.devDependencies);

  const end = performance.now();
  console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
});
