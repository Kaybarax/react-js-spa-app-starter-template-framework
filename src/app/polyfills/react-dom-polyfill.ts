/**
 * Polyfill for ReactDOM.findDOMNode which was removed in React 18+
 * This is needed for compatibility with Material-UI v4
 */
import * as ReactDOM from 'react-dom';

// Add findDOMNode if it doesn't exist
if (!ReactDOM.findDOMNode) {
  // @ts-expect-error - we're intentionally adding this method
  ReactDOM.findDOMNode = function findDOMNode(component) {
    if (component == null) {
      return null;
    }
    if (component.nodeType === 1) {
      return component;
    }
    // For class components with refs
    if (component._reactInternals) {
      return ReactDOM.findDOMNode(component._reactInternals.stateNode);
    }
    // For function components or components without refs
    return component;
  };
}

export default ReactDOM;
