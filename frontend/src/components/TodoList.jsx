import { VStack, HStack, Checkbox, Text, IconButton, Flex, Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

function TodoList({ todos, onDelete, onToggleCompleted }) {
  if (!todos || todos.length === 0) return null;

  return (
    <VStack spacing={4} align="stretch">
      {todos.map((todo) => (
        <Flex 
          key={todo.id}
          bg="rgba(255, 255, 255, 0.6)" 
          backdropFilter="blur(10px)"
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="white"
          p={4}
          transition="transform 0.2s"
          _hover={{ transform: "translateX(4px)" }}
        >
          <Checkbox
            isChecked={todo.completed}
            onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
            colorScheme="blue"
            size="lg"
            mr={3}
          />
          <Text 
            flex="1"
            fontSize="md"
            textDecoration={todo.completed ? 'line-through' : 'none'}
            color={todo.completed ? 'gray.400' : 'inherit'}
            alignSelf="center"
          >
            {todo.title}
          </Text>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            variant="ghost"
            size="sm"
            colorScheme="red"
            ml={2}
          />
        </Flex>
      ))}
    </VStack>
  )
}

export default TodoList 