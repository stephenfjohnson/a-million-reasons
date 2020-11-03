import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "./ModalContext";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";

const client = new ApolloClient({
  uri: "https://api.8base.com/ckgvur6c700hc08l20azna6je",
  cache: new InMemoryCache()
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
