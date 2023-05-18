const fs = require("fs");

function getIndirectDependencies() {
  // Read the package-lock.json file into a string
  const lockfile = fs.readFileSync("package-lock.json", "utf8");

  // Parse the lockfile JSON
  const lockfileJson = JSON.parse(lockfile);

  // Create a Set to store the direct dependencies
  const directDependencies = new Set();

  // Iterate over the dependencies listed in package.json
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  for (const dep of Object.keys(packageJson.dependencies || {})) {
    directDependencies.add(dep);
  }
  for (const dep of Object.keys(packageJson.devDependencies || {})) {
    directDependencies.add(dep);
  }

  // console.log("lockFile: ", lockfileJson.packages);

  // Create a Set to store the indirect dependencies
  const indirectDependencies = new Set();

  // Iterate over the packages listed in package-lock.json
  for (const [pkgName, pkgData] of Object.entries(lockfileJson.packages)) {
    // Skip any packages that are not dependencies
    if (!pkgData.dependencies) {
      continue;
    }

    // Iterate over the dependencies of the package
    for (const [depName, depData] of Object.entries(pkgData.dependencies)) {
      // Check if the dependency is not a direct dependency and is not already in the indirectDependencies Set
      if (
        !directDependencies.has(depName) &&
        !indirectDependencies.has(depName)
      ) {
        // Add the dependency to the indirectDependencies Set
        indirectDependencies.add(depName);
      }
    }
  }

  // // Return the Set of indirect dependencies as an Array
  // // return Array.from(indirectDependencies);
  let stack = Array.from(indirectDependencies);
  console.log("stack: ", stack);
}

// console.log(getIndirectDependencies());
getIndirectDependencies();
