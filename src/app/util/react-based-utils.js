//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {isNullUndefined} from "./util";

/**
 * sd _ Kaybarax
 * The following mimics React's natural state update behavior.
 * This function might be required to be executed in instances where
 * MobX has run too fast at ~50ms - 100ms, beyond React's state update speed
 * Also useful in ensuring imported components are loaded,
 * in the case in which they cannot be accessed
 */
export function enforceReactNaturalStateUpdateBehavior(self) {
  if (isNullUndefined(self) || typeof self !== 'object') {
    console.log('State update failed');
    return;
  }
  if (typeof self.state !== 'object')
    self.state = {updated: false};
  self.setState({updated: true});
}
