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
export { Get_Projects };
