import Header from "./components/header.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Client from "./components/Client.jsx";
import Projects from "./components/projects.jsx";
import Addclientmodal from "./components/Addclientmodal.jsx";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
});
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />

        <div className="container">
          <Addclientmodal />
          <Projects />
          <Client />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
