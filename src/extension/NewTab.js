import { Flex, Input, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import DnDWrapper from "../components/DnDWrapper";
import WeatherWidget from "../widget/weather/weatherWidget";
import DevJokeGeneratorWidget from "../widget/jokeGenerator/DevJokeGeneratorWidget";
import SpotifyWidget from "../widget/spotify/SpotifyWidget";
import DarkMode from "../widget/darkMode";
import GgoSearch from "../components/GgoSearch";

export const widgets = [
  <WeatherWidget />,
  <DevJokeGeneratorWidget />,
  <DarkMode />,
  <SpotifyWidget />,
];

function NewTab() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      bgGradient={
        colorMode === "light"
          ? "linear-gradient(90deg, rgba(71,62,209,1) 0%, rgba(159,121,236,1) 100%)"
          : "linear-gradient(90deg, rgba(36, 32, 97,1) 0%, rgba(86, 61, 135,1) 100%)"
      }
      minH="100vh"
      p="10"
      overflow="hidden"
      flexDir="column"
      align="center"
    >
      <Flex w="100%" justify="space-between">
        <Text color="white" fontSize="md" fontFamily="monospace">
          Hey Harsh! 👋
        </Text>
        <Text color="white" fontSize="md" fontFamily="monospace">
          Give(a)Go
        </Text>
      </Flex>
      <GgoSearch />
      <DnDWrapper />
    </Flex>
  );
}

export default NewTab;
