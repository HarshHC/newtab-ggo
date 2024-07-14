// src/DevJokeGenerator.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Center,
  Spinner,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import axios from "axios";

const DevJokeGeneratorWidget = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const { colorMode } = useColorMode();

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
      );
      setJoke(response.data.joke);
    } catch (error) {
      setJoke("Failed to fetch a joke. Please try again.");
      console.error("Error fetching joke:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <Box
        textAlign="center"
        p="2"
        borderRadius="md"
        bg={colorMode === "light" ? "gray.50" : "gray.800"}
        maxH="250px"
        overflowY="auto"
      >
        {!joke && (
          <Text fontSize="xl" mb="4">
            Dev Joke Generator
          </Text>
        )}
        <Button colorScheme="teal" onClick={fetchJoke} mb="4" hidden={!!joke}>
          {loading ? <Spinner size="sm" /> : "Generate Joke"}
        </Button>
        {joke && (
          <Box
            mt="4"
            p="4"
            bg={colorMode === "light" ? "gray.100" : ""}
            borderRadius="md"
          >
            <Text fontSize="lg">{joke}</Text>
          </Box>
        )}
        <IconButton
          onClick={fetchJoke}
          aria-label="Refresh joke"
          icon={<RepeatIcon />}
          variant="solid"
          colorScheme="teal"
          position="fixed"
          bottom="16px"
          right="16px"
          zIndex="1000"
        />
      </Box>
    </Center>
  );
};

export default DevJokeGeneratorWidget;
