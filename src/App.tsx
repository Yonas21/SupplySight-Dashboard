import { ApolloProvider } from '@apollo/client/react';
import { client } from './apollo/client';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ApolloProvider client={client}>
      <Dashboard />
    </ApolloProvider>
  );
}

export default App;
