const fs = require('node:fs');

const text = fs.readFileSync('actual.txt', 'utf8');

// Part 1
// const pattern = /mul\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\)/g;
// const matches = text.match(pattern) || [];

// let sum = 0;

// matches.forEach(match => {
//     const [, num1, num2] = match.match(/mul\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\)/);
//     sum += num1 * num2;
// });

// console.log('total sum:', sum);

// Part 2
const pattern = /(?:mul\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\)|do\(\)|don't\(\))/g;
const matches = text.match(pattern) || [];

let enabled = true;
let sum = 0;

matches.forEach(match => {
   const mulMatch = match.match(/mul\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\)/);
   if (mulMatch) {
      if (enabled) {
        sum += mulMatch[1] * mulMatch[2];
      }
   } else {
      enabled = match === 'do()' ? true : false;   
   }
});

console.log('total sum:', sum);