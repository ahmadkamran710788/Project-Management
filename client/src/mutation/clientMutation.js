import { gql } from "@apollo/client";

const ADD_CLIENT_MUTATION = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DeleteClient = gql`
mutation deleteClient($id:ID!){
    deleteClient(id:$id){
        id
        name
        email
        phone
    }
}
`;
export { DeleteClient, ADD_CLIENT_MUTATION };
