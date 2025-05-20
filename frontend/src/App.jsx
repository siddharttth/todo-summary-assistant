import { ChakraProvider, Container, VStack, Heading, Box, useColorMode, IconButton, Flex } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import SummaryButton from './components/SummaryButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const API_URL = 'http://localhost:3001'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`)
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async (title) => {
    try {
      await axios.post(`${API_URL}/todos`, { title })
      fetchTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const toggleCompleted = async (id, completed) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}`, { completed })
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const generateSummary = async () => {
    setLoading(true)
    try {
      await axios.post(`${API_URL}/summarize`)
      alert('Summary sent to Slack!')
    } catch (error) {
      console.error('Error generating summary:', error)
      alert('Error generating summary')
    }
    setLoading(false)
  }

  const pendingTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return (
    <ChakraProvider>
      <Flex minH="100vh" direction="column" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
        <Container maxW="md" flex="1" py={8}>
          <VStack spacing={6} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading size="lg">Todo Summary Assistant</Heading>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="ghost"
              />
            </Flex>
            <AddTodoForm onAdd={addTodo} />
            <Box>
              <TodoList
                title="Pending"
                todos={pendingTodos}
                onDelete={deleteTodo}
                onToggleCompleted={toggleCompleted}
              />
              <TodoList
                title="Completed"
                todos={completedTodos}
                onDelete={deleteTodo}
                onToggleCompleted={toggleCompleted}
              />
            </Box>
            <SummaryButton onClick={generateSummary} isLoading={loading} />
          </VStack>
        </Container>
      </Flex>
    </ChakraProvider>
  )
}

export default App
