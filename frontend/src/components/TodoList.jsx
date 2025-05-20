import { VStack, HStack, Checkbox, Text, IconButton, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

function TodoList({ todos, onDelete, onToggleCompleted }) {
  if (!todos || todos.length === 0) return null;

  return (
    <VStack spacing={4} align="stretch">
      {todos.map((todo) => (
        <Flex 
          key={todo.id}
          bg="#1a1a1a" 
          borderRadius="md"
          borderWidth="1px"
          borderColor="#333333"
          p={4}
          transition="all 0.2s"
          _hover={{ borderColor: "#444444" }}
        >
          <Checkbox
            isChecked={todo.completed}
            onChange={(e) => onToggleCompleted(todo.id, e.target.checked)}
            colorScheme="gray"
            size="md"
            mr={3}
            borderColor="#444444"
          />
          <Text 
            flex="1"
            fontSize="sm"
            textDecoration={todo.completed ? 'line-through' : 'none'}
            color={todo.completed ? 'gray.500' : 'gray.200'}
            alignSelf="center"
            letterSpacing="0.2px"
          >
            {todo.title}
          </Text>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            variant="ghost"
            size="sm"
            color="gray.400"
            _hover={{ color: "red.400", bg: "transparent" }}
          />
        </Flex>
      ))}
    </VStack>
  )
}

export default TodoList 