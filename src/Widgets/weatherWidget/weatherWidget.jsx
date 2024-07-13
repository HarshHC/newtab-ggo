// src/WeatherWidget.js
import React, { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { getWeatherDescription } from "./weatherDescription";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: 51.5074, // Latitude for London
              longitude: -0.1278, // Longitude for London
              current_weather: true,
            },
          }
        );
        setWeather(response.data.current_weather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Box
        width="250px"
        height="250px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!weather) {
    return (
      <Box
        width="250px"
        height="250px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Error loading weather data
      </Box>
    );
  }

  const weatherDescription = getWeatherDescription(weather.weathercode);

  return (
    <Box
      width="250px"
      height="250px"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      textAlign="center"
      bg="gray.100"
    >
      <Text fontSize="xl" fontWeight="bold">
        London
      </Text>
      <Text fontSize="lg">{weatherDescription}</Text>
      <Text fontSize="2xl">{weather.temperature}°C</Text>
    </Box>
  );
};

export default WeatherWidget;
