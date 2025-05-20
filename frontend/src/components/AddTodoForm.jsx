import { useState } from 'react'
import { Input, Button, HStack } from '@chakra-ui/react'

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
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <HStack>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          size="lg"
        />
        <Button type="submit" colorScheme="blue" size="lg">
          Add
        </Button>
      </HStack>
    </form>
  )
}

export default AddTodoForm 