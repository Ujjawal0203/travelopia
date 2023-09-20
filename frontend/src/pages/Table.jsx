import { Box, Button, Flex, SimpleGrid, Skeleton, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Table(){
    const [data , setData] = useState([]);
    const [load , setLoad] = useState(false);
    const toast = useToast();

   useEffect(()=>{
    setLoad(true)
     async function getData(){
        let res = await axios.get('https://stormy-tights-hen.cyclic.app/form');
        let ans = await res.data;
        if(ans.status){
            setLoad(false)
            setData(ans.data)
        }
        else{
            setLoad(false)
            toast({
                title: 'Error Occured',
                description : ans.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
        }
     }
     getData();
   },[])
    return <Box w='90%' m='auto'>

        <Link to='/'>
        <Flex justifyContent='right'  w='80%' m='auto' mb='20px' mt='40px'>
            <Button bg='#202A44' color='white' _hover={{bg:'#202A44'}} variant='outline' >Add New Journey</Button>
        </Flex>
        </Link>
        {
            load?<SimpleGrid columns={['1','1','2','4']} gap='20px' mt='30px'>
                {
                    [1,2,3,4].map((ele)=>{
                        return <Skeleton key={ele} h='250px' ></Skeleton>
                    })
                }
            </SimpleGrid>:data.length==0?<Flex justifyContent='center' alignItems='center'>
               <Text>No Data</Text>
            </Flex>:
        <SimpleGrid columns={['1','1','2','4']} gap='20px' mt='30px'>
           {
            data?.map((ele)=>{
                  return <Box key={ele._id} boxShadow='#0e0043 0px 5px 15px' p='40px 20px'>
                        <Text>Name : - {ele.name}</Text>
                        <Text>Email : - {ele.email}</Text>
                        <Text>Destination : - {ele.destination}</Text>
                        <Text>Total Person : - {ele.travelors}</Text>
                        <Text>Budget : - {ele.budget}</Text>
                  </Box>
            })
           }
        </SimpleGrid>
        }

    </Box>
}