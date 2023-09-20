import { Box, Button, Flex, Input, Select, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const init = {
    name :'',
    travelors : 0,
    email:'',
    per_person : 0,
    destination : ''
}
export default function (){
    const [obj , setObj]= useState(init);
    const [budget , setBudget] = useState(Number(obj.per_person)*Number(obj.travelors))
    const [load , setLoad] = useState(false);
    const toast = useToast();

     const handleChange = (e)=>{
        const {name , value} = e.target;
        setObj({...obj, [name]:value})
        if(name == 'per_person'){
            setBudget(Number(value)*Number(obj.travelors))
        }
        else if(name == 'travelors'){
            setBudget(Number(value)*Number(obj.per_person))
        }
     }


     const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoad(true)
        let newObj = obj;
        newObj.budget = budget;
        let res = await axios.post('https://stormy-tights-hen.cyclic.app/form' , newObj);
        let ans = await res.data;
        if(ans.status){
            setLoad(false)
            toast({
                title: 'Form Submitted',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
              setObj(init);
              setBudget(0)
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


    return <Box>
   
       <Box w={['300px','400px','500px','500px']} m='auto' mt='50px'>
            <Link to='/table'>
        <Flex justifyContent='right' mb='10px'>
            <Button bg='#202A44' color='white' _hover={{bg:'#202A44'}} variant='outline' >Dashboard</Button>
        </Flex>
            </Link>
        <form onSubmit={(e)=>handleSubmit(e)}>

            <Box mb='10px'>
                <Text mb='5px'>Name</Text>
                <Input required type='text' name='name' value={obj.name} onChange={(e)=>handleChange(e)} />
            </Box>
            <Box mb='10px'>
                <Text mb='5px'>Email</Text>
                <Input required type='email' name='email' value={obj.email} onChange={(e)=>handleChange(e)} />
            </Box>
            <Box mb='10px'>
                <Text mb='5px'>Where to Go</Text>
                <Select type='text' name='destination' value={obj.destination} onChange={(e)=>handleChange(e)} >
                     <option value="">Select Destination</option>
                     <option value="India">India</option>
                     <option value="Africa">Africa</option>
                     <option value="Europe">Europe</option>
                </Select>
            </Box>
            <Box mb='10px'>
                <Text mb='5px'>Number Of Persom</Text>
                <Input required type='number' name='travelors' value={obj.travelors} onChange={(e)=>handleChange(e)} />
            </Box>
            <Box mb='10px'>
                <Text mb='5px'>Budget Per Person in $</Text>
                <Input required type='number' name='per_person' value={obj.per_person} onChange={(e)=>handleChange(e)} />
            </Box>
           
             <SimpleGrid w='100%' columns='2' gap='10px' >
                 <Button bg='#202A44' color='white' _hover={{bg:'#202A44'}} variant='outline' >Budget : {budget} $</Button>
                 <Button isLoading={load} bg='#202A44' color='white' _hover={{bg:'#202A44'}} variant='outline' type='submit'>Submit</Button>
             </SimpleGrid>
        </form>
       </Box>
          
    </Box>
}