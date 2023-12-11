import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Header from './components/Header'



const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
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
