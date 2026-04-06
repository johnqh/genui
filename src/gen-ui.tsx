import * as React from 'react';
import { Box } from '@sudobility/components';
import { cn, ui } from '@sudobility/design';
import type { GenUIProps } from './types';
import { RenderNode } from './render-node';

export const GenUI: React.FC<GenUIProps> = ({
  renderable,
  onAction,
  className,
}) => {
  return (
    <Box
      as='section'
      className={cn(
        ui.background.subtle,
        'w-full rounded-xl p-4 md:p-6',
        className
      )}
    >
      <RenderNode renderable={renderable} onAction={onAction} />
    </Box>
  );
};
