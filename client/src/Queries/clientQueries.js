import { gql } from "@apollo/client";

const GetClient = gql`
  query getClient {
    clients {
      id
      name
      email
      phone
    }
  }
`;
export { GetClient };
