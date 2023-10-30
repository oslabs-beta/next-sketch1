import { UniqueIdentifier, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@mui/material';
import { Tag } from '../../utils/interfaces';

/**
 * @description - creates a draggable item
 * @parent - StaticTagsContainer.tsx
 */

interface DraggableItemProps {
  id: UniqueIdentifier;
  children: Tag;
}

export const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { name, container } = children;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      name: name,
      container: container,
      type: 'type1',
      isDraggableItem: true,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      variant='contained'
      sx={{
        textAlign: 'center',
        bgcolor: '#FEFCFB',
        color: '#0A0908',
        border: 1,
        fontSize: 12,
        margin: 0.5,
        borderRadius: '7px',
        paddingLeft: 3.5,
        paddingRight: 3.5,
        width: 'fit-content',
        minWidth: 80,
        height: 35,
        boxShadow: 8,
        ':hover': {
          bgcolor: 'rgba(191, 196, 248, 0.8)',
          color: '#FEFCFB',
          borderColor: 'black',
        },
      }}
    >
      {children.name}
    </Button>
  );
};

export const DraggableItemOverlay = ({ children }: DraggableItemProps) => {
  return (
    <Button
      variant='contained'
      sx={{
        bgcolor: '#FEFCFB',
        color: '#0A0908',
        border: 1,
        fontSize: 15,
        margin: 0.5,
        borderRadius: '7px',
        paddingRight: 5,
        paddingLeft: 5,
        width: 5,
        height: 30,
        boxShadow: 8,
        ':hover': {
          bgcolor: 'rgba(191, 196, 248, 0.8)',
          color: '#FEFCFB',
          borderColor: 'black',
        },
      }}
    >
      {children.name}
    </Button>
  );
};