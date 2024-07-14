import { Input } from "@chakra-ui/react";

function GptSearch() {
  return (
    <Input
      w="50%"
      mt="20"
      borderRadius="xl"
      placeholder="GPT it!"
      color="white"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = e.target.value;
          window.location.href =
            "https://chat.openai.com/?model=gpt-4&q=" + value;
          // window.open("https://chat.openai.com/?model=gpt-4&q=" + value);
        }
      }}
    />
  );
}

export default GptSearch;
