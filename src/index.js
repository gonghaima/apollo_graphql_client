import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApolloClient from "apollo-boost";
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: `https://w5xlvm3vzz.lp.gql.zone/graphql`
});

// Fetch GraphQL data with plain JS
client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(({ data }) => console.log({ data }));
  
const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>{`${currency}: ${rate}`}</p>
        </div>
      ));
    }}
  </Query>
);


const App = () => (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
