import type {
  IRenderable,
  IRenderableAction,
  IRenderableImage,
  IRenderableLabel,
  IRenderableScreen,
  IRenderableView,
} from './types';

export const isRenderableScreen = (
  destination?: IRenderableAction | IRenderableScreen | null
): destination is IRenderableScreen =>
  Boolean(destination && 'view' in destination);

export const labelText = (label?: IRenderableLabel | null): string =>
  label?.text ?? '';

export const imageSrc = (image?: IRenderableImage | null): string | undefined =>
  image?.url ?? image?.local ?? undefined;

export const actionValueOf = (renderable: IRenderable): string | undefined => {
  const value = renderable.destination?.value;
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  const viewValue = renderable.view?.valueText?.text;
  if (typeof viewValue === 'string' && viewValue.length > 0) {
    return viewValue;
  }

  return undefined;
};

export const viewOf = (renderable: IRenderable): IRenderableView | undefined =>
  renderable.view ??
  (isRenderableScreen(renderable.destination)
    ? renderable.destination.view
    : undefined);

export const isInputLayout = (layout?: string | null): boolean =>
  layout === 'input_text' ||
  layout === 'input_numeric' ||
  layout === 'input_password' ||
  layout === 'input_email' ||
  layout === 'input_phone' ||
  layout === 'input_date' ||
  layout === 'input_text_block' ||
  layout === 'search';

export const inputTypeForLayout = (layout?: string | null): string => {
  switch (layout) {
    case 'input_numeric':
      return 'number';
    case 'input_password':
      return 'password';
    case 'input_email':
      return 'email';
    case 'input_phone':
      return 'tel';
    case 'input_date':
      return 'date';
    default:
      return 'text';
  }
};
