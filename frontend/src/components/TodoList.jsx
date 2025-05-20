import { VStack, Box, Text, IconButton, HStack, Checkbox, Heading, useColorModeValue } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

function TodoList({ title, todos, onDelete, onToggleCompleted }) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const isPending = title === 'Pending'

  if (todos.length === 0) return null

  return (
    <Box mb={6}>
      <Heading size="md" mb={3} color={isPending ? 'blue.500' : 'green.500'}>
        {title} ({todos.length})
      </Heading>
      <VStack spacing={3} width="100%">
        {todos.map((todo) => (
          <HStack
            key={todo.id}
            w="100%"
            p={3}
            bg={cardBg}
            borderRadius="md"
            boxShadow="sm"
            justify="space-between"
            align="center"
            flexWrap="wrap"
          >
            <HStack spacing={3} flex="1">
              <Checkbox
                isChecked={todo.completed}
                onChange={e => onToggleCompleted(todo.id, e.target.checked)}
                colorScheme={isPending ? 'blue' : 'green'}
              />
              <Text
                as={todo.completed ? 's' : undefined}
                fontSize="lg"
                wordBreak="break-word"
                color={todo.completed ? 'gray.400' : undefined}
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
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

export default TodoList 