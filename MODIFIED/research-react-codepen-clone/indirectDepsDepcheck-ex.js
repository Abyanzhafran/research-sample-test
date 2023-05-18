// const depcheck = require("depcheck");

// async function detectIndirectDependencies(directoryPath) {
//   const options = {
//     ignoreDirs: ["node_modules"], // Exclude specific directories from analysis
//     ignoreMatches: ["jest"], // Exclude specific package names from analysis
//     ignorePatterns: ["*.test.js"], // Exclude specific file patterns from analysis
//   };

//   const result = await depcheck(directoryPath, options);

//   const indirectDependencies = result.using.filter((dependency) => {
//     return !result.dependencies.includes(dependency);
//   });

//   console.log("Indirect Dependencies:");
//   indirectDependencies.forEach((dependency) => {
//     console.log(dependency);
//   });
// }

// // Usage
// // detectIndirectDependencies("/path/to/your/project");
// detectIndirectDependencies(".");

const depcheck = require("depcheck");
const path = require("path");

async function detectIndirectDependencies(directoryPath = ".") {
  const absolutePath = path.resolve(directoryPath);

  const options = {
    ignoreBinPackage: true, // ignore the packages with bin entry
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
      // only check .js or .json file and ignore jest
      "jest",
      "eslint",
      "babel-*",
    ],
    ignorePatterns: [],
  };

  const result = await depcheck(absolutePath, options);

  // try to change this logic(original)
  // const indirectDependencies = result.using.filter((dependency) => {
  //   return !result.dependencies.includes(dependency);
  // });

  const indirectDependencies = Object.keys(result.using).filter((deps) => {
    return !result.dependencies.includes(deps);
  });

  console.log("Indirect Dependencies:");
  indirectDependencies.forEach((dependency) => {
    console.log(dependency);
  });
}

// Usage
detectIndirectDependencies();
