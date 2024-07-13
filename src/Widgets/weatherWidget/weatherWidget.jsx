// src/WeatherWidget.js
import React, { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { getWeatherDescription } from "./weatherDescription";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
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

    const fetchCityName = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const cityName =
          response.data.address.city ||
          response.data.address.town ||
          response.data.address.village ||
          "Unknown location";
        setCity(cityName);
      } catch (error) {
        console.error("Error fetching city name:", error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeather(latitude, longitude);
            fetchCityName(latitude, longitude);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation();
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
