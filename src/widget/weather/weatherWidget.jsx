// src/WeatherWidget.js
import React, { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { getWeatherDescription } from "./weatherDescription";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: latitude,
              longitude: longitude,
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

    const fetchLocation = async () => {
      const cachedLocation = localStorage.getItem("location");
      if (cachedLocation) {
        const { city, latitude, longitude } = JSON.parse(cachedLocation);
        setCity(city);
        fetchWeather(latitude, longitude);
      } else {
        try {
          const response = await axios.get(`https://ipapi.co/json/`);
          const { city, latitude, longitude } = response.data;
          localStorage.setItem(
            "location",
            JSON.stringify({ city, latitude, longitude })
          );
          setCity(city);
          fetchWeather(latitude, longitude);
        } catch (error) {
          console.error("Error fetching location data:", error);
          setLoading(false);
        }
      }
    };

    fetchLocation();
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
        {city}
      </Text>
      <Text fontSize="lg">{weatherDescription}</Text>
      <Text fontSize="2xl">{weather.temperature}°C</Text>
    </Box>
  );
};

export default WeatherWidget;
