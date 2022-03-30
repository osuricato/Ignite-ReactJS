import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Samuel Souza</Text>
          <Text color="gray.300" fontSize="small">
            samuel.gomes@precato.com.br
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Samuel Souza"
        src="https://github.com/osuricato.png"
      />
    </Flex>
  )
}