/**
 * Polyfill for ReactDOM.findDOMNode which was removed in React 18+
 * This is needed for compatibility with Material-UI v4
 */
import * as ReactDOM from 'react-dom';

// Add TypeScript declaration for window.ReactDOM
declare global {
  interface Window {
    ReactDOM: typeof ReactDOM & {
      findDOMNode?: (component: any) => any;
    };
  }
}

// Define the findDOMNode function
function findDOMNodePolyfill(component: any) {
  if (component == null) {
    return null;
  }
  if (component.nodeType === 1) {
    return component;
  }
  // For class components with refs
  if (component._reactInternals) {
    return findDOMNodePolyfill(component._reactInternals.stateNode);
  }
  // For function components or components without refs
  return component;
}

// Add the findDOMNode function to the window.ReactDOM object
// This is a workaround for the immutability of imports
if (typeof window !== 'undefined') {
  // Create or get the global ReactDOM object
  if (!window.ReactDOM) {
    window.ReactDOM = { ...ReactDOM };
  }

  // Add findDOMNode if it doesn't exist
  if (!window.ReactDOM.findDOMNode) {
    window.ReactDOM.findDOMNode = findDOMNodePolyfill;
  }
}

// Also export the polyfilled ReactDOM for direct imports
export default {
  ...ReactDOM,
  findDOMNode: findDOMNodePolyfill
};
