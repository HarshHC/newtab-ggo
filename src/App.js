import { ChakraProvider, Flex } from "@chakra-ui/react";
import "./App.css";
import NewTab from "./extension/NewTab";
import { Grid } from "./components/Grid";
import DnDWrapper from "./components/DnDWrapper";

function App() {
  return (
    <ChakraProvider>
      <Flex w="100%">
        <NewTab />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
