import { useState } from 'react'
import { Input, Button, Flex, Box, Icon } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FaRegCommentDots } from 'react-icons/fa'

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
      bg="rgba(255, 255, 255, 0.7)" 
      borderRadius="xl" 
      p={5} 
      boxShadow="md"
      backdropFilter="blur(10px)"
      borderWidth="1px"
      borderColor="white"
    >
      <Flex alignItems="center">
        <Icon as={FaRegCommentDots} color="purple.500" boxSize={5} mr={3} ml={1} />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          borderRadius="md"
          mr={3}
          bg="white"
          _focus={{ borderColor: "purple.400", boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)" }}
          border="1px solid"
          borderColor="gray.100"
        />
        <Button
          type="submit"
          colorScheme="blue"
          borderRadius="md"
          leftIcon={<AddIcon />}
          px={6}
          isDisabled={!title.trim()}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s"
        >
          Add
        </Button>
      </Flex>
    </Box>
  )
}

export default AddTodoForm 