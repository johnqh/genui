import type { CSSProperties } from 'react';
import type {
  FontWeight,
  IRenderableLabelModifier,
  IRenderableViewModifier,
  ThemeColor,
} from './types';

const textColorMap: Record<string, string> = {
  // Semantic role colors -> @sudobility/design semantic tokens
  LABEL: 'text-foreground',
  LABEL_SECONDARY: 'text-muted-foreground',
  LABEL_TERTIARY: 'text-muted-foreground',
  LABEL_QUATERNARY: 'text-muted-foreground',
  LINK: 'text-primary',
  TABLE_CELL_BLUE_TEXT: 'text-primary',
  ACTION_TEXT: 'text-primary-foreground',
  ACTION_TEXT_SECONDARY: 'text-secondary-foreground',
  ACTION_TEXT_DESTRUCTIVE: 'text-destructive-foreground',
  NAVITEM_TEXT: 'text-muted-foreground',
  NAVITEM_TEXT_SELECTED: 'text-primary',
  SUCCESS: 'text-success',
  WARNING: 'text-warning',
  WARNING_SECONDARY: 'text-warning',
  ERROR: 'text-destructive',
  SELECTED: 'text-primary',
  DISABLED: 'text-muted-foreground',
  TEXT_PLACEHOLDER: 'text-muted-foreground',
  // SYSTEM_* / WHITE / BLACK / *_GRAY: explicit named-color palette requested
  // by the render payload (iOS UIColor-style). Decorative data, not semantic
  // roles -- intentionally kept as fixed palette values.
  SYSTEM_BLUE: 'text-blue-500',
  SYSTEM_BROWN: 'text-amber-700',
  SYSTEM_CYAN: 'text-cyan-500',
  SYSTEM_GRAY: 'text-gray-500',
  SYSTEM_GRAY2: 'text-gray-400',
  SYSTEM_GRAY3: 'text-slate-400',
  SYSTEM_GRAY4: 'text-slate-300',
  SYSTEM_GRAY5: 'text-slate-200',
  SYSTEM_GRAY6: 'text-slate-100',
  SYSTEM_GREEN: 'text-green-500',
  SYSTEM_INDIGO: 'text-indigo-500',
  SYSTEM_LIME: 'text-lime-500',
  SYSTEM_MINT: 'text-emerald-400',
  SYSTEM_ORANGE: 'text-orange-500',
  SYSTEM_PINK: 'text-pink-500',
  SYSTEM_PURPLE: 'text-purple-500',
  SYSTEM_RED: 'text-red-500',
  SYSTEM_TEAL: 'text-teal-500',
  SYSTEM_YELLOW: 'text-yellow-500',
  WHITE: 'text-white',
  BLACK: 'text-black',
  LIGHT_GRAY: 'text-slate-300',
  DARK_GRAY: 'text-slate-700',
};

const backgroundColorMap: Record<string, string> = {
  // Semantic role colors -> @sudobility/design semantic tokens
  CLEAR: 'bg-transparent',
  BACKGROUND: 'bg-background',
  BACKGROUND_SECONDARY: 'bg-muted',
  BACKGROUND_TERTIARY: 'bg-muted',
  BACKGROUND_QUATERNARY: 'bg-muted',
  BACKGROUND_GROUPED: 'bg-muted',
  BACKGROUND_GROUPED_SECONDARY: 'bg-muted',
  BACKGROUND_GROUPED_TERTIARY: 'bg-muted',
  TABLE_BACKGROUND: 'bg-card',
  ACTION_BACKGROUND: 'bg-primary',
  ACTION_BACKGROUND_SECONDARY: 'bg-secondary',
  ACTION_BACKGROUND_DESTRUCTIVE: 'bg-destructive',
  NAV_BACKGROUND: 'bg-card',
  NAVITEM_BACKGROUND: 'bg-muted',
  NAVITEM_BACKGROUND_SELECTED: 'bg-accent',
  FILL: 'bg-muted',
  FILL_SECONDARY: 'bg-muted',
  FILL_TERTIARY: 'bg-muted',
  FILL_QUANTERNARY: 'bg-muted',
  SELECTED: 'bg-accent',
  SUCCESS: 'bg-success/10',
  WARNING: 'bg-warning/10',
  WARNING_SECONDARY: 'bg-warning/20',
  ERROR: 'bg-destructive/10',
  DISABLED: 'bg-muted',
  // SYSTEM_* / WHITE / BLACK / *_GRAY: explicit named-color palette requested
  // by the render payload (iOS UIColor-style). Decorative data, not semantic
  // roles -- intentionally kept as fixed palette values.
  SYSTEM_BLUE: 'bg-blue-500',
  SYSTEM_BROWN: 'bg-amber-700',
  SYSTEM_CYAN: 'bg-cyan-500',
  SYSTEM_GRAY: 'bg-gray-500',
  SYSTEM_GRAY2: 'bg-gray-400',
  SYSTEM_GRAY3: 'bg-slate-400',
  SYSTEM_GRAY4: 'bg-slate-300',
  SYSTEM_GRAY5: 'bg-slate-200',
  SYSTEM_GRAY6: 'bg-slate-100',
  SYSTEM_GREEN: 'bg-green-500',
  SYSTEM_INDIGO: 'bg-indigo-500',
  SYSTEM_LIME: 'bg-lime-500',
  SYSTEM_MINT: 'bg-emerald-400',
  SYSTEM_ORANGE: 'bg-orange-500',
  SYSTEM_PINK: 'bg-pink-500',
  SYSTEM_PURPLE: 'bg-purple-500',
  SYSTEM_RED: 'bg-red-500',
  SYSTEM_TEAL: 'bg-teal-500',
  SYSTEM_YELLOW: 'bg-yellow-500',
  WHITE: 'bg-white',
  BLACK: 'bg-black',
  LIGHT_GRAY: 'bg-slate-200',
  DARK_GRAY: 'bg-slate-700',
};

const fontWeightMap: Record<FontWeight, string> = {
  TITLE: 'font-semibold',
  SUBTITLE: 'font-medium',
  BODY: 'font-normal',
  VALUE: 'font-medium',
  FOOTNOTE: 'font-normal uppercase tracking-wide text-xs',
};

export const resolveTextClasses = (
  modifier?: IRenderableLabelModifier | null
): string => {
  if (!modifier) {
    return '';
  }

  const classes = [];

  if (modifier.color) {
    classes.push(textColorMap[modifier.color] ?? '');
  }

  if (modifier.fontWeight) {
    classes.push(fontWeightMap[modifier.fontWeight] ?? '');
  }

  return classes.filter(Boolean).join(' ');
};

export const resolveViewModifierClasses = (
  modifier?: IRenderableViewModifier | null
): string => {
  if (!modifier) {
    return '';
  }

  const classes = [];

  if (modifier.bgColor) {
    classes.push(backgroundColorMap[modifier.bgColor] ?? '');
  }

  return classes.filter(Boolean).join(' ');
};

export const resolveDimensionStyle = (
  modifier?: IRenderableViewModifier | null
): CSSProperties | undefined => {
  if (!modifier) {
    return undefined;
  }

  return {
    width: modifier.width ?? undefined,
    height: modifier.height ?? undefined,
    gap: modifier.spacing ?? undefined,
  };
};

export const isThemeColor = (value?: string | null): value is ThemeColor =>
  typeof value === 'string' && value.length > 0;
