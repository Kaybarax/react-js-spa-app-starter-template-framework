# Stores Subsystem

This directory contains a simplified implementation of the stores subsystem using zustand.

## Core Functionalities

1. Stores are served with zustand
2. Stores and their updates are persisted to localStorage
3. On initializing stores, they are initialized with persisted data from localStorage if available
4. The user can reset a store and its persisted correspondent

## Files

- `createStore.ts`: A utility function to create zustand stores with persistence and reset functionality
- `stores.ts`: Definitions of all stores used in the application
- `index.ts`: Exports all stores and utilities
- `test-stores.ts`: A simple test file to verify that the stores work as expected

## Usage

### Creating a Store

```typescript
import { createStore } from './createStore';

interface MyStoreState {
  count: number;
  text: string;
}

const useMyStore = createStore<MyStoreState>('myStore', {
  count: 0,
  text: 'Hello, World!',
});
```

### Using a Store in Components

```typescript
import { useAppStore } from './stores';
import { useEffect } from 'react';

function MyComponent() {
  // Get values from the store
  const user = useAppStore(state => state.user);
  const loading = useAppStore(state => state.loading);
  
  // Update the store
  const setUser = (user) => useAppStore.setState({ user });
  
  // Reset the store to its initial state
  const resetStore = () => useAppStore.getState().reset();
  
  return (
    <div>
      {loading ? 'Loading...' : `User: ${user?.name}`}
      <button onClick={() => setUser({ id: 1, name: 'John Doe' })}>Set User</button>
      <button onClick={resetStore}>Reset</button>
    </div>
  );
}
```

### Resetting All Stores

```typescript
import { resetAllStores } from './stores';

// Reset all stores to their initial state
resetAllStores();
```

### Clearing All Persisted Stores

```typescript
import { clearAllPersistedStores } from './stores';

// Clear all persisted stores from localStorage
clearAllPersistedStores();
```