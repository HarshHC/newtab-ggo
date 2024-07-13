// src/SortableItem.js
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemWrapper from "./ItemWrapper";
import { Box, IconButton } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

const SortableItem = (props) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box ref={setNodeRef} style={style} display="flex" alignItems="center">
      <ItemWrapper withOpacity={isDragging} {...props} />
      <IconButton
        {...attributes}
        {...listeners}
        aria-label="Drag handle"
        icon={<DragHandleIcon />}
        variant="ghost"
        colorScheme="teal"
        cursor="grab"
      />
    </Box>
  );
};

export default SortableItem;
