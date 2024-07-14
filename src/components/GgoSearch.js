import { Input } from "@chakra-ui/react";
import { useEffect } from "react";

function GgoSearch() {
  useEffect(() => {
    document.getElementById("searchInput").focus();
  }, []);

  return (
    <Input
      id="searchInput"
      w="50%"
      mt="20"
      borderRadius="xl"
      placeholder="Give it a go!"
      color="white"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = e.target.value;
          let firstWord = value.split(" ")[0];

          if (firstWord.toLowerCase() === "g") {
            // rest of the string
            let newVal = value.substring(firstWord.length + 1);
            window.location.href = "https://www.google.com/search?q=" + newVal;
          } else {
            window.location.href =
              "https://chat.openai.com/?model=gpt-4&q=" + value;
          }
        }
      }}
    />
  );
}

export default GgoSearch;
