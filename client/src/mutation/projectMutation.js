import { gql } from "@apollo/client";

const ADD_PROJECT_MUTATION = gql`
  mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
      id
      name
      description
      status 
      clientId {
        id
        name
        email
        phone
      }
    }
  }
`;

const DeleteProject = gql`
mutation deleteProject($id:ID!){
    deleteProject(id:$id){
        id
        name
        description
        status
    }
}
`;
export { ADD_PROJECT_MUTATION, DeleteProject };
