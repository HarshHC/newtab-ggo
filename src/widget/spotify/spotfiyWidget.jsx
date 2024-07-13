// src/SpotifyWidget.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Link,
  Spinner,
  Button,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

const CLIENT_ID = "f24241f76c9745d5b0fe961912a25bfb";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-top-read";

const SpotifyWidget = () => {
  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);

    if (token) {
      fetchTopArtists(token);
    }
  }, []);

  const fetchTopArtists = async (token) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtists(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top artists:", error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;
  };

  const handleLogout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  if (!token) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Button onClick={handleLogin}>Login to Spotify</Button>
      </Box>
    );
  }

  return (
    <Box p="4" borderRadius="md" width="250px" height="250px">
      <Button onClick={handleLogout} mb="2">
        Logout
      </Button>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        Top 5 Artists This Week
      </Text>
      {loading ? (
        <Box>
          {[...Array(3)].map((_, index) => (
            <Flex key={index} alignItems="center" mb="4">
              <Box boxSize="50px" bg="gray.200" mr="4" />
              <Box
                bg="gray.200"
                height="20px"
                width="100px"
                borderRadius="md"
              />
            </Flex>
          ))}
        </Box>
      ) : (
        artists.map((artist) => (
          <Flex
            key={artist.id}
            alignItems="center"
            mb="2"
            _hover={{ bg: "purple.100" }}
            borderRadius="md"
          >
            <Link href={artist.external_urls.spotify} isExternal>
              <Image
                src={artist.images[0]?.url}
                alt={artist.name}
                boxSize="50px"
                mr="4"
                borderRadius="md"
              />
            </Link>
            <Link href={artist.external_urls.spotify} isExternal>
              <Button
                variant="link"
                colorScheme="black"
                size="md"
                borderRadius="md"
                wordBreak="break-word"
              >
                {artist.name}
              </Button>
            </Link>
          </Flex>
        ))
      )}
    </Box>
  );
};

export default SpotifyWidget;
