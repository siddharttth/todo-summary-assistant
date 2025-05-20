import { Button } from '@chakra-ui/react'

function SummaryButton({ onClick, isLoading }) {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      loadingText="Generating..."
      colorScheme="green"
      size="lg"
      width="100%"
    >
      Generate & Send Summary to Slack
    </Button>
  )
}

export default SummaryButton 