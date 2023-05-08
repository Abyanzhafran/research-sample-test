const { performance } = require("perf_hooks");
const depcheck = require("depcheck");

const start = performance.now();
depcheck(__dirname, {}, (unused) => {
  const end = performance.now();
  console.log(unused.dependencies);
  console.log(unused.devDependencies);
  console.log(`Time taken: ${(end - start).toFixed(2)} milliseconds`);
});
