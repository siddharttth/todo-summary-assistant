import { Button, Icon } from '@chakra-ui/react'
import { FaSlack } from 'react-icons/fa'

function SummaryButton({ onClick, isLoading }) {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      loadingText="Sending to Slack..."
      bg="#4A154B" // Slack purple
      color="white"
      size="lg"
      width="100%"
      py={6}
      borderRadius="lg"
      leftIcon={<Icon as={FaSlack} boxSize={5} />}
      boxShadow="md"
      fontWeight="medium"
      _active={{ transform: "scale(0.98)" }}
      _hover={{ bg: "#611f64", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      Send AI Summary to Slack
    </Button>
  )
}

export default SummaryButton 