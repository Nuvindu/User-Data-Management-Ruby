import React from "react";
import ReactDOM from "react-dom";
// import * as React from 'react'
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {
    Container,
  } from '@chakra-ui/react'
  import { createHttpLink } from 'apollo-link-http';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useSubscription,
    useMutation,
    gql
  } from "@apollo/client";

  import { ApolloLink } from 'apollo-link';
  import { HttpLink } from 'apollo-link-http';
  import { createConsumer } from '@rails/actioncable';
  import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';


  // const cable = createConsumer()
  const link = new HttpLink({
    uri: 'http://localhost:3000/graphql' // This is relative to our Rails API port running on 3000
  });

  // const hasSubscriptionOperation = ({ query: { definitions } }) => {
  //   return definitions.some(
  //     ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  //   )
  // }
  
  // const link = ApolloLink.split(
  //   hasSubscriptionOperation,
  //   new ActionCableLink({cable}),
  //   httpLink
  // );
  // console.log(link)
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
  });
const LOAD_MESSAGES = gql`
{
  users {
    id
    name
    email
    postsCount
  }
}
`;
const GET_MESSAGES = gql`
subscription useSub{
  helloWorld{
      name
      email
      postsCount
  }
}

`;
const POST_MESSAGE = gql`
mutation postFeed($user: String!, $content: String!){
	postMessage(user: $user,content: $content){
    id
    user
    content
  }
}
`;


const Chat = ({user}) => {
    // const {data} = useQuery(LOAD_MESSAGES);
    const {data} = useSubscription(GET_MESSAGES); 
    console.log(data) 
    // console.log(data.helloWorld)
     
    if(!data){
        return null;
    }
    return (
      <>
      <div>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th isNumeric>PostsCount</Th>
          </Tr>
        </Thead>
      {data.helloWorld.map(({ id, name: username, email: emailAdd,postsCount: count, content }) => (      

              <Tbody>
                <Tr>
                  <Td>{username}</Td>
                  <Td>{emailAdd}</Td>
                  <Td isNumeric>{count}</Td>
                </Tr>
                
              </Tbody>
         ))} 
            </Table>

          </div>
        
    
    </>
    );
   
};



export default () => (
    <ApolloProvider client={client} >
        <h1 style={{
              textAlign: "center",
            }} >Users</h1>
        <br/>
        <br/>
        <br/>
        <Chat />
    </ApolloProvider>
);
