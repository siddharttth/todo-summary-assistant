import { useState } from 'react'
import { Input, Button, Flex, Box } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title)
      setTitle('')
    }
  }

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit}
      bg="#171717" 
      borderRadius="md" 
      p={5} 
      borderWidth="1px"
      borderColor="#333333"
    >
      <Flex alignItems="center">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          borderRadius="md"
          mr={3}
          bg="transparent"
          _focus={{ borderColor: "gray.500", boxShadow: "none" }}
          border="1px solid"
          borderColor="#333333"
          color="white"
          _placeholder={{ color: "gray.500" }}
          fontSize="sm"
        />
        <Button
          type="submit"
          bg="#333333"
          color="white"
          borderRadius="md"
          leftIcon={<AddIcon />}
          px={6}
          isDisabled={!title.trim()}
          _hover={{ bg: "#444444" }}
          _active={{ bg: "#222222" }}
          transition="all 0.2s"
          fontWeight="medium"
          letterSpacing="0.5px"
          fontSize="sm"
        >
          ADD
        </Button>
      </Flex>
    </Box>
  )
}

export default AddTodoForm 