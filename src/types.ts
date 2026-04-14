// Re-export all shared types from genui_types
export {
  FontWeight,
  ThemeColor,
  ScreenLayout,
  ViewLayout,
} from '@sudobility/genui_types';
export type {
  GenUIActionHandler,
  IRenderable,
  IRenderableAction,
  IRenderableImage,
  IRenderableImageModifier,
  IRenderableLabel,
  IRenderableLabelModifier,
  IRenderableLocation,
  IRenderableScreen,
  IRenderableScreenModifier,
  IRenderableUrl,
  IRenderableView,
  IRenderableViewModifier,
  IScreenSEO,
} from '@sudobility/genui_types';

import type { GenUIActionHandler, IRenderable } from '@sudobility/genui_types';

export interface GenUIProps {
  renderable: IRenderable;
  onAction?: GenUIActionHandler;
  className?: string;
  googleMapsApiKey?: string;
}
