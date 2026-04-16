import * as React from 'react';
import { cn } from '@sudobility/design';
import type { GenUIProps } from './types';
import { RenderNode } from './render-node';

export const GoogleMapsApiKeyContext = React.createContext<string | undefined>(
  undefined
);

export const GenUI: React.FC<GenUIProps> = ({
  renderable,
  onAction,
  className,
  googleMapsApiKey,
}) => {
  return (
    <GoogleMapsApiKeyContext.Provider value={googleMapsApiKey}>
      <div className={cn('w-full', className)}>
        <RenderNode renderable={renderable} onAction={onAction} />
      </div>
    </GoogleMapsApiKeyContext.Provider>
  );
};
