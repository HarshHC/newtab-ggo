import { Flex } from "@chakra-ui/react";
import React from "react";

const Grid = ({ children, columns }) => {
  return (
    <Flex
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gridGap={5}
      px="200px"
      pt="200px"
      justifyItems="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
};

export default Grid;
