import { useAppStore, useLoginStore, usePage1ExampleStore, resetAllStores, clearAllPersistedStores } from './stores';

// Test the stores
function testStores() {
  console.log('Testing stores...');

  // Test app store
  const appStore = useAppStore.getState();
  console.log('App store initial state:', appStore);
  
  // Update app store
  useAppStore.setState({ user: { id: 1, name: 'Test User' } });
  console.log('App store after update:', useAppStore.getState());
  
  // Test login store
  const loginStore = useLoginStore.getState();
  console.log('Login store initial state:', loginStore);
  
  // Update login store
  useLoginStore.setState({ 
    loginForm: { 
      usernameOrEmail: 'test@example.com', 
      password: 'password123' 
    } 
  });
  console.log('Login store after update:', useLoginStore.getState());
  
  // Test page example store
  const pageStore = usePage1ExampleStore.getState();
  console.log('Page store initial state:', pageStore);
  
  // Update page store
  usePage1ExampleStore.setState({ 
    todo: [{ id: 1, text: 'Test todo' }] 
  });
  console.log('Page store after update:', usePage1ExampleStore.getState());
  
  // Test reset functionality
  console.log('Resetting stores...');
  resetAllStores();
  
  console.log('App store after reset:', useAppStore.getState());
  console.log('Login store after reset:', useLoginStore.getState());
  console.log('Page store after reset:', usePage1ExampleStore.getState());
  
  // Test clearing persisted stores
  console.log('Clearing persisted stores...');
  clearAllPersistedStores();
  
  console.log('Test completed.');
}

// Run the test
testStores();

// Export the test function for use in other files
export { testStores };