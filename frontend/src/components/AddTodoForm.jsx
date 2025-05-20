import { useState } from 'react'
import { Input, Button, HStack, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

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
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      as="form"
      onSubmit={handleSubmit}
      width="100%"
      mb={6}
    >
      <HStack
        p={4}
        bg="rgba(255, 255, 255, 0.8)"
        borderRadius="xl"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(0,0,0,0.1)"
        spacing={3}
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          size="lg"
          variant="filled"
          bg="rgba(255, 255, 255, 0.9)"
          _hover={{ bg: 'rgba(255, 255, 255, 1)' }}
          _focus={{ bg: 'rgba(255, 255, 255, 1)' }}
          transition="all 0.3s ease"
        />
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          px={8}
          _hover={{ transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
          transition="all 0.2s ease"
        >
          Add
        </Button>
      </HStack>
    </MotionBox>
  )
}

export default AddTodoForm 