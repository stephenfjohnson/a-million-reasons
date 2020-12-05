import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "./ModalContext";
import { offsetLimitPagination } from "@apollo/client/utilities";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        reasonsList: {
          items: offsetLimitPagination()
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: "https://api.8base.com/ckgvur6c700hc08l20azna6je",
  cache: cache
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
