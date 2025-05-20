import { ChakraProvider, Container, VStack, Heading, Tab, Tabs, TabList, TabPanel, TabPanels, Box, Flex, Text, extendTheme } from '@chakra-ui/react'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import SummaryButton from './components/SummaryButton'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3001'

// Configure theme
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ 
  config,
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(to bottom right, #eef6ff, #f0e6ff)',
      }
    }
  },
  components: {
    Tabs: {
      variants: {
        "soft-rounded": {
          tab: {
            borderRadius: "full",
            fontWeight: "medium",
            _selected: {
              bg: "blue.50",
              color: "blue.500",
            }
          }
        }
      }
    },
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" }
      }
    }
  }
})

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

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

  const clearCompleted = async () => {
    try {
      await axios.delete(`${API_URL}/todos/completed`)
      fetchTodos()
    } catch (error) {
      console.error('Error clearing completed todos:', error)
    }
  }

  const generateSummary = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/summarize`)
      if (response.data.summary) {
        if (response.data.slackStatus === 'sent') {
          alert('Summary generated and sent to Slack successfully!')
        } else {
          alert('Summary generated successfully, but failed to send to Slack. Please check your Slack webhook configuration.')
        }
      } else {
        throw new Error('No summary generated')
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      alert('Error generating summary: ' + (error.response?.data?.error || error.message))
    }
    setLoading(false)
  }

  const activeTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)
  const allTodos = [...todos]
  
  return (
    <ChakraProvider theme={theme}>
      <Flex minH="100vh" direction="column" justifyContent="center" alignItems="center">
        <Container maxW="md" py={12}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center" mb={4}>
              <Heading size="xl" color="blue.600" mb={2} fontWeight="bold">SlackMate</Heading>
              <Text fontSize="md" color="gray.600">To-Do list that Streamlines your productivity</Text>
            </Box>
            
            <AddTodoForm onAdd={addTodo} />
            
            <Box 
              bg="white" 
              borderRadius="2xl" 
              boxShadow="md" 
              p={6}
              backdropFilter="blur(10px)"
              backgroundColor="rgba(255, 255, 255, 0.7)"
              borderWidth="1px"
              borderColor="white"
            >
              <Heading size="md" mb={5} fontWeight="semibold">My Tasks</Heading>
              
              <Tabs variant="soft-rounded" colorScheme="blue" size="sm" isFitted>
                <TabList mb={6} justifyContent="center">
                  <Tab mx={1} py={1} px={4}>All</Tab>
                  <Tab mx={1} py={1} px={4}>Active</Tab>
                  <Tab mx={1} py={1} px={4}>Completed</Tab>
                </TabList>
                
                <TabPanels>
                  <TabPanel p={0}>
                    {allTodos.length > 0 ? (
                      <TodoList 
                        todos={allTodos} 
                        onDelete={deleteTodo} 
                        onToggleCompleted={toggleCompleted} 
                      />
                    ) : (
                      <Box textAlign="center" py={12}>
                        <Heading size="sm" color="gray.500">No tasks found</Heading>
                        <Text fontSize="sm" color="gray.400" mt={2}>Add a task to get started!</Text>
                      </Box>
                    )}
                  </TabPanel>
                  
                  <TabPanel p={0}>
                    {activeTodos.length > 0 ? (
                      <TodoList 
                        todos={activeTodos} 
                        onDelete={deleteTodo} 
                        onToggleCompleted={toggleCompleted} 
                      />
                    ) : (
                      <Box textAlign="center" py={12}>
                        <Heading size="sm" color="gray.500">No active tasks</Heading>
                        <Text fontSize="sm" color="gray.400" mt={2}>Add a task to get started!</Text>
                      </Box>
                    )}
                  </TabPanel>
                  
                  <TabPanel p={0}>
                    {completedTodos.length > 0 ? (
                      <>
                        <TodoList 
                          todos={completedTodos} 
                          onDelete={deleteTodo} 
                          onToggleCompleted={toggleCompleted} 
                        />
                        <Flex justify="flex-end" mt={6}>
                          <Text 
                            as="button"
                            fontSize="sm"
                            color="red.500"
                            onClick={clearCompleted}
                            _hover={{ textDecoration: "underline" }}
                          >
                            Clear completed
                          </Text>
                        </Flex>
                      </>
                    ) : (
                      <Box textAlign="center" py={12}>
                        <Heading size="sm" color="gray.500">No completed tasks</Heading>
                        <Text fontSize="sm" color="gray.400" mt={2}>Complete a task to see it here!</Text>
                      </Box>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            
            <SummaryButton onClick={generateSummary} isLoading={loading} />
          </VStack>
        </Container>
      </Flex>
    </ChakraProvider>
  )
}

export default App
