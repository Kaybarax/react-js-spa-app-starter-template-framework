//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";
import {isBoolean, isEmptyArray, isEmptyString, isNullUndefined, objectKeyExists,} from './util';
import {enforceReactNaturalStateUpdateBehavior} from "./react-based-utils";

//TEXT-INPUTS
/**
 * sd _ Kaybarax
 * @param model
 * @param key
 * @returns {*}
 */
export function textValue(model, key) {
  let feedBack = null;
  if (isNullUndefined(model)) {
    console.log('No model');
    return feedBack;
  }
  //model must have key
  if (!objectKeyExists(model, key)) return feedBack;
  if (isNullUndefined(model[key])) return feedBack;
  return model[key];
}

/**
 * sd _ Kaybarax
 * @param model
 * @param text
 * @param key
 * @param activity
 * @returns {*}
 */
export function textValueChanged(model, text, key, activity) {
  let feedBack = null;
  if (isNullUndefined(model)) {
    console.log('No model');
    return feedBack;
  }
  //model must have key
  if (!objectKeyExists(model, key)) return feedBack;
  model[key] = text;
  !isNullUndefined(activity) &&
  enforceReactNaturalStateUpdateBehavior(activity);
}

//END

//CHECKBOXES & RADIO-BUTTONS
/**
 * sd _ Kaybarax
 * @param model
 * @param key
 * @returns {boolean}
 */
export function checkboxItemChecked(model, key) {
  let isChecked = false;
  if (isNullUndefined(model)) {
    console.log('No model');
    return isChecked;
  }
  //model must have key
  if (!objectKeyExists(model, key)) return isChecked;
  if (isBoolean(model[key]) && !model[key]) return isChecked;
  if (isNullUndefined(model[key])) return isChecked;
  isChecked = true;
  return isChecked;
}

/**
 * sd _ Kaybarax
 * @param model
 * @param checkedTrue
 * @param key
 * @param activity
 * @returns {*}
 */
export function checkboxItemValueChanged(model, checkedTrue, key, activity) {
  let feedback = null;
  if (isNullUndefined(model)) {
    console.log('No model');
    return feedback;
  }
  //model must have key
  if (!objectKeyExists(model, key)) return feedback;
  if (checkedTrue) {
    // noinspection EqualityComparisonWithCoercionJS
    model[key] = 1;
  } else {
    // noinspection EqualityComparisonWithCoercionJS
    model[key] = null;
  }
  !isNullUndefined(activity) &&
  enforceReactNaturalStateUpdateBehavior(activity);
  return model[key];
}

/**
 * sd _ Kaybarax
 * @param val
 * @param key
 * @param model
 * @returns {boolean}
 */
export function radioButtonSelected(val, key, model) {
  if (isNullUndefined(model)) {
    return false;
  }
  if (!objectKeyExists(model, key)) {
    console.log('Option not found',);
    return false;
  }
  if (isNullUndefined(model[key])) {
    return false;
  }
  // noinspection EqualityComparisonWithCoercionJS
  return model[key] == val;
}

/**
 * sd _ Kaybarax
 * @param checkedTrue
 * @param value
 * @param key
 * @param model
 * @param activity
 * @returns {*}
 */
export function radioButtonValueChanged(checkedTrue, value, key, model, activity) {
  let feedback = null;
  if (isNullUndefined(model)) {
    console.log('No model');
    return feedback;
  }
  //model must have key
  if (!objectKeyExists(model, key)) {
    console.log('Add extra data to the model, not allowed here!');
    return;
  }
  if (checkedTrue) {
    // noinspection EqualityComparisonWithCoercionJS
    if (model[key] != value) {
      model[key] = value;
      feedback = value;
    }
  } else {
    // noinspection EqualityComparisonWithCoercionJS
    model[key] = null;
  }
  !isNullUndefined(activity) &&
  enforceReactNaturalStateUpdateBehavior(activity);
  return feedback;
}

//END

//PICKERS, SPINNERS, SELECTS
/**
 * sd _ Kaybarax
 * @param model
 * @param spinnerDefaultValue
 * @param spinnerItemsArray
 * @param key
 * @returns {*}
 */
export function spinnerSelectedValue(
    model,
    spinnerDefaultValue,
    spinnerItemsArray,
    key,
) {
  // noinspection EqualityComparisonWithCoercionJS
  return isNullUndefined(model) || isEmptyArray(spinnerItemsArray)
      ? null
      : isNullUndefined(
          spinnerItemsArray.find((item) => item.value == spinnerDefaultValue),
      )
          ? null
          : !objectKeyExists(model, key)
              ? spinnerDefaultValue
              : isNullUndefined(spinnerItemsArray.find((item) => item.value == model[key]))
                  ? spinnerDefaultValue
                  : model[key];
}

/**
 * sd _ Kaybarax
 * @param model
 * @param val
 * @param key
 * @param activity
 */
export function spinnerOnValueChanged(model, val, key, activity) {
  if (isNullUndefined(model)) return;
  if (isEmptyString(key)) return;
  if (isNullUndefined(val)) return;
  if (!objectKeyExists(model, key)) return;
  model[key] = val;
  !isNullUndefined(activity) &&
  enforceReactNaturalStateUpdateBehavior(activity);
}

/**
 * sd _ Kaybarax
 * @param itemsArray
 * @returns {[]}
 */
export function generateSpinnerOptions(itemsArray) {
  let spinnerOptions = [];
  !isEmptyArray(itemsArray) && ((() => (spinnerOptions = itemsArray.map(item => {
    return (<option value={item.value} key={item.value}>{item.text || item.label}</option>);
  })))());
  return spinnerOptions;
}

//END
