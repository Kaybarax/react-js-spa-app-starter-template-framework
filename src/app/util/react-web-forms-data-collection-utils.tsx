/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { JSX } from 'react';
import { isBoolean, isEmptyArray, isEmptyString, isNullUndefined, objectKeyExists } from './util';
import { enforceReactNaturalStateUpdateBehavior } from './react-based-utils';

export interface SpinnerItem {
  value: string | number;
  text?: string;
  label?: string;
}

//TEXT-INPUTS

export function textValue(model: Record<string, unknown>, key: string): unknown {
  if (isNullUndefined(model)) {
    console.log('No model');
    return null;
  }
  //model must have key
  if (!objectKeyExists(model, key)) return null;
  if (isNullUndefined(model[key])) return null;
  return model[key];
}

export function textValueChanged(
  model: Record<string, unknown>,
  text: string,
  key: string,
  activity?: React.Component,
): unknown {
  const feedBack = null;
  if (isNullUndefined(model)) {
    console.log('No model');
    return feedBack;
  }
  //model must have key
  if (!objectKeyExists(model as Record<string, unknown>, key)) return feedBack;
  (model as Record<string, unknown>)[key] = text;
  if (!isNullUndefined(activity)) enforceReactNaturalStateUpdateBehavior(activity as React.Component);
}

//END

//CHECKBOXES & RADIO-BUTTONS

export function checkboxItemChecked(model: Record<string, unknown>, key: string): boolean {
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

export function checkboxItemValueChanged(
  model: Record<string, unknown>,
  checkedTrue: boolean,
  key: string,
  activity: React.Component,
): unknown {
  if (isNullUndefined(model)) {
    console.log('No model');
    return null;
  }
  //model must have key
  if (!objectKeyExists(model, key)) return null;
  if (checkedTrue) {
    // noinspection EqualityComparisonWithCoercionJS
    model[key] = 1;
  } else {
    // noinspection EqualityComparisonWithCoercionJS
    model[key] = null;
  }
  if (!isNullUndefined(activity)) enforceReactNaturalStateUpdateBehavior(activity);
  return model[key];
}

export function radioButtonSelected(val: unknown, key: string, model: Record<string, unknown>): boolean {
  if (isNullUndefined(model)) {
    return false;
  }
  if (!objectKeyExists(model, key)) {
    console.log('Option not found');
    return false;
  }
  if (isNullUndefined(model[key])) {
    return false;
  }
  // noinspection EqualityComparisonWithCoercionJS
  return model[key] == val;
}

export function radioButtonValueChanged(
  checkedTrue: boolean,
  value: unknown,
  key: string,
  model: Record<string, unknown>,
  activity: React.Component,
): unknown {
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
  if (!isNullUndefined(activity)) enforceReactNaturalStateUpdateBehavior(activity);
  return feedback;
}

//END

//PICKERS, SPINNERS, SELECTS
export function spinnerSelectedValue(
  model: Record<string, unknown>,
  spinnerDefaultValue: string | number,
  spinnerItemsArray: SpinnerItem[],
  key: string,
): unknown {
  // noinspection EqualityComparisonWithCoercionJS
  return isNullUndefined(model) || isEmptyArray(spinnerItemsArray)
    ? null
    : isNullUndefined(spinnerItemsArray.find(item => item.value == spinnerDefaultValue))
      ? null
      : !objectKeyExists(model, key)
        ? spinnerDefaultValue
        : isNullUndefined(spinnerItemsArray.find(item => item.value == model[key]))
          ? spinnerDefaultValue
          : model[key];
}

export function spinnerOnValueChanged(
  model: Record<string, unknown>,
  val: unknown,
  key: string,
  activity: React.Component,
): void {
  if (isNullUndefined(model)) return;
  if (isEmptyString(key)) return;
  if (isNullUndefined(val)) return;
  if (!objectKeyExists(model, key)) return;
  model[key] = val;
  if (!isNullUndefined(activity)) enforceReactNaturalStateUpdateBehavior(activity);
}

export function generateSpinnerOptions(itemsArray: SpinnerItem[]): JSX.Element[] {
  const spinnerOptions: JSX.Element[] = [];
  if (!isEmptyArray(itemsArray))
    (() =>
      itemsArray.map(item => {
        spinnerOptions.push(
          <option value={item.value} key={item.value}>
            {item.text || item.label}
          </option>,
        );
      }))();
  return spinnerOptions;
}

//END
