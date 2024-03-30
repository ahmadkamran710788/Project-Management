import { gql } from "@apollo/client";

const Get_Projects = gql`
  query getClient {
    projects{
  	id
    name
    status
    
}
  }
`;

const Get_Project = gql`


query getProject($id:ID!){
    project(id:$id){
        id
        name
        description
        status
        clientId{
            id 
            name
            email
            phone
        }
    }
}



`;
export { Get_Projects, Get_Project };
