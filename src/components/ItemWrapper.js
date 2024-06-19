import { Flex } from "@chakra-ui/react";
import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";

// export type ItemProps =  {
//     id: string;
//     withOpacity?: boolean;
//     isDragging?: boolean;
// };

const ItemWrapper = forwardRef(
  ({ id, withOpacity, isDragging, style, ...props }, ref) => {
    const itemStyle = {
      opacity: withOpacity ? "0.5" : "1",
      transformOrigin: "50% 50%",
      height: "200px",
      width: "200px",
      borderRadius: "10px",
      cursor: isDragging ? "grabbing" : "grab",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: isDragging
        ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
        : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <Flex ref={ref} {...props} style={itemStyle}>
        {id}
      </Flex>
    );
  }
);

export default ItemWrapper;
