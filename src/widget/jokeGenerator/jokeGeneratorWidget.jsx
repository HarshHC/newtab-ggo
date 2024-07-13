// src/GeekJokeGenerator.js
import React, { useState } from 'react';
import { Box, Button, Text, Center, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const GeekJokeGenerator = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json');
      setJoke(response.data.joke);
    } catch (error) {
      setJoke('Failed to fetch a joke. Please try again.');
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center height="100vh">
      <Box textAlign="center" p="6" boxShadow="md" borderRadius="md" bg="white">
        <Text fontSize="2xl" mb="4">Geek Joke Generator</Text>
        <Button colorScheme="teal" onClick={fetchJoke} mb="4">
          {loading ? <Spinner size="sm" /> : 'Generate Joke'}
        </Button>
        {joke && (
          <Box mt="4" p="4" bg="gray.100" borderRadius="md">
            <Text fontSize="lg">{joke}</Text>
          </Box>
        )}
      </Box>
    </Center>
  );
};

export default GeekJokeGenerator;