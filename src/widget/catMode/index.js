/*global chrome*/
import { Flex, Switch, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./chromeUtils";

function CatMode() {
  const [isCatMode, setIsCatMode] = useState(false);
  useEffect(() => {
    const catMode = localStorage.getItem("catMode");
    if (catMode !== null) {
      setIsCatMode(catMode === "true");
    }
  }, []);

  useEffect(() => {
    chrome.storage?.sync.get(["replaceImages"], (result) => {
      const newValue = !result.replaceImages;
      chrome.storage.sync.set({ replaceImages: newValue }, () => {
        const message = newValue
          ? "Image replacement is ON"
          : "Image replacement is OFF";
        alert(message);
        chrome.tabs.query({}, (tabs) => {
          for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id, { replaceImages: newValue });
          }
        });
      });
    });
  }, [isCatMode]);

  return (
    <Flex boxSize="250px" justify="center" align="center" flexDir="column">
      <Text>I {"<3"} Cats</Text>
      <Switch
        isChecked={isCatMode}
        my="2"
        size="lg"
        onChange={() => {
          localStorage.setItem("catMode", !isCatMode);
          setIsCatMode(!isCatMode);
        }}
      />
    </Flex>
  );
}

export default CatMode;
