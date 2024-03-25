import Header from "./components/header.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Project from "./Pages/Project.jsx";

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
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/projects/:id" Component={Project} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
