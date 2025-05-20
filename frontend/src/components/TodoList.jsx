import { VStack, Box, Text, IconButton, HStack, Checkbox, Heading, useColorModeValue } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionHStack = motion(HStack)

function TodoList({ title, todos, onDelete, onToggleCompleted }) {
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')
  const isPending = title === 'Pending'

  if (todos.length === 0) return null

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      mb={6}
    >
      <Heading
        size="md"
        mb={3}
        color={isPending ? 'blue.500' : 'green.500'}
        textShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        {title} ({todos.length})
      </Heading>
      <VStack spacing={3} width="100%">
        {todos.map((todo, index) => (
          <MotionHStack
            key={todo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            w="100%"
            p={4}
            bg={cardBg}
            borderRadius="xl"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}
            justify="space-between"
            align="center"
            flexWrap="wrap"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HStack spacing={3} flex="1">
              <Checkbox
                isChecked={todo.completed}
                onChange={e => onToggleCompleted(todo.id, e.target.checked)}
                colorScheme={isPending ? 'blue' : 'green'}
                size="lg"
              />
              <Text
                as={todo.completed ? 's' : undefined}
                fontSize="lg"
                wordBreak="break-word"
                color={todo.completed ? 'gray.400' : undefined}
                transition="all 0.3s ease"
              >
                {todo.title}
              </Text>
            </HStack>
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => onDelete(todo.id)}
              colorScheme="red"
              variant="ghost"
              size="sm"
              aria-label="Delete todo"
              _hover={{ transform: 'scale(1.1)' }}
              transition="all 0.2s ease"
            />
          </MotionHStack>
        ))}
      </VStack>
    </MotionBox>
  )
}

export default TodoList 