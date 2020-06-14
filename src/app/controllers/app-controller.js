//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {isNullUndefined, objectKeyExists} from "../util/util";

/**
 * sd _ Kaybarax
 * @param key
 * @param model
 * @param expectationFunction
 * @returns {*}
 */
export function displayFieldExpectationSatisfied(key, model, expectationFunction) {
  if (isNullUndefined(model))
    return false;
  if (!objectKeyExists(model, key))
    return false;
  return expectationFunction(model[key]);
}
