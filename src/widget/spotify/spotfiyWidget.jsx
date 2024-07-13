// src/SpotifyWidget.js
import React, { useState, useEffect } from "react";
import { Box, Text, Image, Link, Spinner, Button } from "@chakra-ui/react";
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

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p="4">
      <Button onClick={handleLogout} mb="4">
        Logout
      </Button>
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Top 5 Artists This Week
      </Text>
      {artists.map((artist) => (
        <Box key={artist.id} display="flex" alignItems="center" mb="4">
          <Image
            src={artist.images[0]?.url}
            alt={artist.name}
            boxSize="50px"
            mr="4"
          />
          <Link href={artist.external_urls.spotify} isExternal>
            <Text fontSize="xl" fontWeight="bold">
              {artist.name}
            </Text>
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default SpotifyWidget;
