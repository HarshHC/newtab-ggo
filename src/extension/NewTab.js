import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import DnDWrapper from "../components/DnDWrapper";
import WeatherWidget from "../widget/weather/weatherWidget";
import CatMode from "../widget/catMode";
import DevJokeGeneratorWidget from "../widget/jokeGenerator/DevJokeGeneratorWidget";
import SpotifyWidget from "../widget/spotify/SpotfyWidget";

export const widgets = [
  <WeatherWidget />,
  <DevJokeGeneratorWidget />,
  <CatMode />,
  <SpotifyWidget />,
];

function NewTab() {
  return (
    <Flex
      w="100%"
      bgGradient="linear-gradient(90deg, rgba(71,62,209,1) 0%, rgba(159,121,236,1) 100%)"
      minH="100vh"
      p="10"
      overflow="hidden"
      flexDir="column"
    >
      <Flex w="100%" justify="space-between">
        <Text color="white" fontSize="md" fontFamily="monospace">
          Hey Harsh! 👋
        </Text>
        <Text color="white" fontSize="md" fontFamily="monospace">
          Give(a)Go
        </Text>
      </Flex>
      <DnDWrapper />
    </Flex>
  );
}

export default NewTab;
