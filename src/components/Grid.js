import { Flex } from "@chakra-ui/react";
import React from "react";

const Grid = ({ children, columns }) => {
  return (
    <Flex
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gridGap={5}
      px="100px"
      pt="150px"
      justifyItems="center"
      alignItems="center"
      maxH="80vh"
    >
      {children}
    </Flex>
  );
};

export default Grid;
