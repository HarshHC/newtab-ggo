import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import DnDWrapper from "../components/DnDWrapper";
import WeatherWidget from "../Widgets/weatherWidget/weatherWidget";

function NewTab() {
  return (
    <Flex
      w="100%"
      bgGradient="linear-gradient(90deg, rgba(71,62,209,1) 0%, rgba(159,121,236,1) 100%)"
      minH="100vh"
      p="10"
      flexDir="column"
    >
      <Flex w="100%" justify="space-between">
        <Text color="white" fontSize="md" fontFamily="monospace">
          Hey Sanat! 👋
        </Text>
        <Text color="white" fontSize="md" fontFamily="monospace">
          Give(a)Go
        </Text>
      </Flex>
      <Flex>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <WeatherWidget />
        </Box>
        <DnDWrapper />
      </Flex>
    </Flex>
  );
}

export default NewTab;
