import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { Box, Button } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';
import { useState, ReactNode } from 'react';

/**
 * @description - creates a sortable item named after a tag element
 * @parent - SortableContainer.tsx
 */

interface ItemProps {
  name: string;
}

interface SortableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
}

export const Item = ({ name }: ItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey',
        color: 'white',
        margin: 2.5,
        height: 40,
        borderRadius: 2,
      }}
    >
      {name}
    </Box>
  );
};

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      animateLayoutChanges: () => false,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: 1,
    position: 'relative',
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  );
};

export default SortableItem;
