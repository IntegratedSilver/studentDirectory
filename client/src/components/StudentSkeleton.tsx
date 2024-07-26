import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Table,
   
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    Text,
    Badge,
    Skeleton,
    SkeletonCircle
  } from "@chakra-ui/react";
  import ColorModeSwitch from "./ColorModeSwitch";
  import { AddIcon } from "@chakra-ui/icons";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { BASE_URL } from "../constant";
  
  interface Student {
    id: number;
    name: string;
    address: number;
    phoneNumber: string;
    email: string;
  }
  
  const StudentSkeleton = () => {
    
  
    return (
      <>
        
        <Box m={32} shadow={"md"} rounded={"md"}>
          <Flex justifyContent={"space-between"} px={"5"}>
            <Heading>
              <Skeleton>Student List</Skeleton>
            </Heading>
            <Button color="teal.300" leftIcon={<AddIcon />}>
              {" "}
             <Skeleton>Add Student</Skeleton>
            </Button>
          </Flex>
  
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
            
              <Thead>
                <Tr>
                  <Th><Skeleton>Id</Skeleton></Th>
                  <Th><Skeleton>Name</Skeleton></Th>
                  <Th><Skeleton>Address</Skeleton></Th>
                  <Th><Skeleton>Email</Skeleton></Th>
                  <Th isNumeric><Skeleton>PhoneNumber</Skeleton></Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.from({length:5}).map((_,index) => (
                  <Tr key={index}>
                    <Td><Skeleton>01</Skeleton></Td>
                    <Td>
                      <HStack>
                        <SkeletonCircle>AD</SkeletonCircle>
                        <Text><Skeleton>Student Name</Skeleton></Text>
                      </HStack>
                    </Td>
  
                  
                    <Td><Skeleton>Student Address</Skeleton></Td>
                    <Td>
  
                      <Badge><Skeleton>Yes</Skeleton></Badge>
                    </Td>
                    <Td><Skeleton>1234343</Skeleton></Td>
                    <Td>
                      <HStack>
                        <SkeletonCircle>1</SkeletonCircle>
                        <SkeletonCircle>1</SkeletonCircle>
                        <SkeletonCircle>1</SkeletonCircle>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              
            </Table>
          </TableContainer>
         
        </Box>
      </>
    );
  };
  
  export default StudentSkeleton
  ;
  