import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink } from '@apollo/client';
import Header from './components/Header'
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink])
});

function App() {
  
    const location = useLocation();
    const isHeaderVisible = location.pathname !== '/'; 

return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        {isHeaderVisible && <Header />}
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
