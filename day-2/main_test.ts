import { isSafe } from "./main.ts";
import { assertFalse } from '@std/assert';

Deno.test(function shouldBeSafe() {
  assertFalse(!isSafe([7, 6, 4, 2, 1]));
});

Deno.test(function unsafeBecauseTooHighDifference() {
  assertFalse(isSafe([1, 2, 7, 8, 9]));
});

Deno.test(function unsafeBecauseTooHighDifference2() {
  assertFalse(isSafe([9, 7, 6, 2, 1]));
})

Deno.test(function unsafeBecauseOfIncreaseAndDecrease() {
  assertFalse(isSafe([1, 3, 2, 4, 5]));
});

Deno.test(function unsafeBecauseOfNoIncreaseNorDecrease() {
  assertFalse(isSafe([8, 6, 4, 4, 1]));
});

Deno.test(function shouldBeSafe2() {
  assertFalse(!isSafe([1, 3, 6, 7, 9]));
});
