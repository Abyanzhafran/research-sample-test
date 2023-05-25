const { performance } = require("perf_hooks");
const { depsChecker } = require("research-deps-checker");

console.log("DepsChecker Result : \n");

const start = performance.now();

depsChecker();

const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(2)} ms`);
