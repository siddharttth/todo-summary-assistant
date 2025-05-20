import { Button, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

function SummaryButton({ onClick, isLoading }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      width="100%"
    >
      <Button
        onClick={onClick}
        isLoading={isLoading}
        loadingText="Generating..."
        colorScheme="green"
        size="lg"
        width="100%"
        p={6}
        borderRadius="xl"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="rgba(0,0,0,0.1)"
        _hover={{
          transform: 'scale(1.02)',
          boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
        }}
        _active={{
          transform: 'scale(0.98)',
        }}
        transition="all 0.2s ease"
      >
        Generate & Send Summary to Slack
      </Button>
    </MotionBox>
  )
}

export default SummaryButton 