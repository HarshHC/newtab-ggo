import { Flex, Switch, Text, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    console.log(darkMode);
    console.log(colorMode);
    if (darkMode !== null) {
      if (colorMode == "light" && darkMode === "true") {
        toggleColorMode();
      }
      setIsDarkMode(darkMode === "true");
    }
  }, []);

  return (
    <Flex boxSize="250px" justify="center" align="center" flexDir="column">
      <Text color={colorMode === "light" ? "black" : "white"} fontWeight="bold">
        DarkMode
      </Text>
      <Switch
        isChecked={isDarkMode}
        color="#483ed1"
        my="2"
        size="lg"
        onChange={() => {
          localStorage.setItem("darkMode", !isDarkMode);
          setIsDarkMode(!isDarkMode);
          toggleColorMode();
        }}
      />
    </Flex>
  );
}

export default DarkMode;
