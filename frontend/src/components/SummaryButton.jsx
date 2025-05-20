import { Button } from '@chakra-ui/react'

function SummaryButton({ onClick, isLoading }) {
  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      loadingText="GENERATING SUMMARY..."
      bg="#333333"
      color="white"
      size="lg"
      width="100%"
      py={6}
      borderRadius="md"
      boxShadow="none"
      fontWeight="medium"
      letterSpacing="1px"
      _hover={{ bg: "#444444" }}
      _active={{ bg: "#222222" }}
      transition="all 0.2s"
      textTransform="uppercase"
      fontSize="sm"
    >
      SEND SUMMARY TO SLACK
    </Button>
  )
}

export default SummaryButton 