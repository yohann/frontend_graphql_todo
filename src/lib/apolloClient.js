import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://yohann-graphql-todo-list-bed98c446341.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

export default apolloClient;