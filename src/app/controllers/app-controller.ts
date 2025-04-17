/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isNullUndefined, objectKeyExists } from '../util/util';

export function displayFieldExpectationSatisfied(
  key: string,
  model: unknown,
  expectationFunction: (value: unknown) => boolean,
): boolean {
  if (isNullUndefined(model)) return false;
  if (!objectKeyExists(model as Record<string, unknown>, key)) return false;
  return expectationFunction((model as Record<string, unknown>)[key]);
}
