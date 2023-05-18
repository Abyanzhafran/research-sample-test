const { performance } = require("perf_hooks");
const depcheck = require("depcheck");

const start = performance.now();
depcheck(__dirname, {}, (unused) => {
  const filteredUnused = {
    dependencies: unused.dependencies.filter(
      (dep) => dep !== "example-indirect-dependency"
    ),
    devDependencies: unused.devDependencies.filter(
      (dep) => dep !== "example-indirect-dependency"
    ),
  };

  const end = performance.now();
  console.log(filteredUnused.dependencies);
  console.log(filteredUnused.devDependencies);
  console.log(`Time taken: ${(end - start).toFixed(2)} milliseconds`);
});
