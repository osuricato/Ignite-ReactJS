import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
    <Box mr="4" textAlign="right">
      <Text>Samuel Souza</Text>
      <Text color="gray.300" fontSize="small">samuel.gomes@precato.com.br</Text>
    </Box>

    <Avatar
      size="md"
      name="Samuel Souza"
      src="https://github.com/osuricato.png"
    />
  </Flex>
  )
}