/*global chrome*/
import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Image,
  Link,
  Button,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";

const CLIENT_ID = "f24241f76c9745d5b0fe961912a25bfb";
const REDIRECT_URI = chrome?.identity?.getRedirectURL()
  ? chrome?.identity?.getRedirectURL()
  : "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = "user-top-read";

const SpotifyWidget = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colorMode } = useColorMode();

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
      fetchTopTracks(token);
    }
  }, []);

  const fetchTopTracks = async (token) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=3",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTracks(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
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
      <Text fontSize="lg" fontWeight="bold" mb="2">
        Your Top 3 Songs
      </Text>
      {loading ? (
        <Box>
          {[...Array(3)].map((_, index) => (
            <Flex key={index} alignItems="center" mb="4">
              <Box
                boxSize="50px"
                bg={colorMode === "light" ? "gray.200" : "black.200"}
                mr="4"
              />
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
        tracks.map((track) => (
          <Flex key={track.id} alignItems="center" mb="4" wrap="nowrap">
            <Image
              src={track.album.images[0]?.url}
              alt={track.name}
              boxSize="50px"
              mr="4"
            />
            <Link
              href={track.external_urls.spotify}
              isExternal
              maxWidth="200px"
            >
              <Button
                variant="link"
                colorScheme="black"
                size="md"
                textAlign="left"
                whiteSpace="normal"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {track.name}
              </Button>
            </Link>
          </Flex>
        ))
      )}
      {/* <Button onClick={handleLogout} mb="2">
        Logout
      </Button> */}
    </Box>
  );
};

export default SpotifyWidget;
