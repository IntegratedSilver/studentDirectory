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
    Th,
    Thead,
    Tr,
    Text,
    useDisclosure,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    PopoverFooter,
    useToast,
  } from "@chakra-ui/react";
  import ColorModeSwitch from "./ColorModeSwitch";
  import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { BASE_URL } from "../constant";
  import StudentForm from "./StudentForm";
import StudentSkeleton from "./StudentSkeleton";
  
  export interface Student {
    id: number;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
  }
  
  const StudentTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    //UseStates
    const [currentData, setCurrentData] = useState<Student>({} as Student);
    const [data, setData] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
  
    //function to help us fetch our data with axios, handle our error
  
    const toast = useToast();
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get(BASE_URL + "Student")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const getStudent = (id: number) => {
      axios
        .get(BASE_URL + "Student/" + id)
        .then((res) => {
          setCurrentData(res.data);
          onOpen();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    if (isLoading) return <StudentSkeleton />;
  
    const handleAdd = () => {
      onOpen();
      setCurrentData({} as Student);
    };
  
  
      const handleDelete = (id:number) => {
        axios.delete(BASE_URL+'Student/'+id)
        .then(() => {
          toast({
            title: "Student Deleted.",
            description: "Student Deleted",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          fetchData();
        }).catch(error => {
          console.log(error);
          
        })
      }
  
    return (
      <>
        <ColorModeSwitch />
        <Box m={32} shadow={"md"} rounded={"md"}>
          <Flex justifyContent={"space-between"} px={"5"}>
            <Heading fontSize={25}>Student List</Heading>
            <Button
              onClick={() => handleAdd()}
              color="teal.300"
              leftIcon={<AddIcon />}
            >
              {" "}
              Add Student
            </Button>
          </Flex>
  
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Address</Th>
                  <Th isNumeric>Phone Number</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((student: Student) => (
                  <Tr key={student.id}>
                    <Td>{student.id}</Td>
                    <Td>
                      <HStack>
                        <Avatar size={"sm"} name={student.name} />
                        <Text>{student.name}</Text>
                      </HStack>
                    </Td>
  
                    <Td>{student.address}</Td>
                    <Td>{student.phoneNumber}</Td>
                    <Td>{student.email}</Td>
                    <Td>
                      <HStack>
                        <EditIcon
                          onClick={() => getStudent(student.id)}
                          boxSize={23}
                          color={"orange.200"}
                        />
                        <Popover>
                          <PopoverTrigger>
                        <DeleteIcon boxSize={23} color={"red.400"} />
                          
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmation!</PopoverHeader>
                            <PopoverBody>
                              Are you sure you want to Delete?
                            </PopoverBody>
                            <PopoverFooter>
                              <Button colorScheme="red" variant={"outline"} onClick={() => handleDelete(student.id)}>Delete</Button>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>
                        <ViewIcon boxSize={23} color={"green.300"} />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {data.length == 0 && (
            <Heading p={5} textAlign={"center"} fontSize={24}>
              No Data
            </Heading>
          )}
          {isOpen && (
            <StudentForm
              currentData={currentData}
              fetchStudent={fetchData}
              isOpen={isOpen}
              onClose={onClose}
            />
          )}
        </Box>
      </>
    );
  };
  
  export default StudentTable;
  