import type { CSSProperties } from 'react';
import type {
  FontWeight,
  IRenderableLabelModifier,
  IRenderableViewModifier,
  ThemeColor,
} from './types';

const textColorMap: Record<string, string> = {
  LABEL: 'text-slate-900',
  LABEL_SECONDARY: 'text-slate-600',
  LABEL_TERTIARY: 'text-slate-500',
  LABEL_QUATERNARY: 'text-slate-400',
  LINK: 'text-blue-600',
  TABLE_CELL_BLUE_TEXT: 'text-blue-600',
  ACTION_TEXT: 'text-white',
  ACTION_TEXT_SECONDARY: 'text-slate-900',
  ACTION_TEXT_DESTRUCTIVE: 'text-white',
  NAVITEM_TEXT: 'text-slate-600',
  NAVITEM_TEXT_SELECTED: 'text-blue-600',
  SUCCESS: 'text-emerald-600',
  WARNING: 'text-amber-600',
  WARNING_SECONDARY: 'text-amber-500',
  ERROR: 'text-rose-600',
  SELECTED: 'text-blue-600',
  DISABLED: 'text-slate-400',
  TEXT_PLACEHOLDER: 'text-slate-400',
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
  CLEAR: 'bg-transparent',
  BACKGROUND: 'bg-white',
  BACKGROUND_SECONDARY: 'bg-slate-50',
  BACKGROUND_TERTIARY: 'bg-slate-100',
  BACKGROUND_QUATERNARY: 'bg-slate-200',
  BACKGROUND_GROUPED: 'bg-slate-50',
  BACKGROUND_GROUPED_SECONDARY: 'bg-slate-100',
  BACKGROUND_GROUPED_TERTIARY: 'bg-slate-200',
  TABLE_BACKGROUND: 'bg-white',
  ACTION_BACKGROUND: 'bg-blue-600',
  ACTION_BACKGROUND_SECONDARY: 'bg-slate-100',
  ACTION_BACKGROUND_DESTRUCTIVE: 'bg-rose-600',
  NAV_BACKGROUND: 'bg-white',
  NAVITEM_BACKGROUND: 'bg-slate-50',
  NAVITEM_BACKGROUND_SELECTED: 'bg-blue-50',
  FILL: 'bg-slate-200',
  FILL_SECONDARY: 'bg-slate-100',
  FILL_TERTIARY: 'bg-slate-50',
  FILL_QUANTERNARY: 'bg-slate-25',
  SELECTED: 'bg-blue-50',
  SUCCESS: 'bg-emerald-50',
  WARNING: 'bg-amber-50',
  WARNING_SECONDARY: 'bg-amber-100',
  ERROR: 'bg-rose-50',
  DISABLED: 'bg-slate-100',
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

const borderColorMap: Record<string, string> = {
  SEPARATOR: 'border-slate-200',
  SEPARATOR_OPAQUE: 'border-slate-300',
  ACTION_BORDER: 'border-blue-600',
  ACTION_BORDER_SECONDARY: 'border-slate-200',
  ACTION_BORDER_DESTRUCTIVE: 'border-rose-600',
  SELECTED: 'border-blue-600',
  SUCCESS: 'border-emerald-600',
  WARNING: 'border-amber-500',
  WARNING_SECONDARY: 'border-amber-400',
  ERROR: 'border-rose-600',
  DISABLED: 'border-slate-300',
  SYSTEM_BLUE: 'border-blue-500',
  SYSTEM_BROWN: 'border-amber-700',
  SYSTEM_CYAN: 'border-cyan-500',
  SYSTEM_GRAY: 'border-gray-500',
  SYSTEM_GRAY2: 'border-gray-400',
  SYSTEM_GRAY3: 'border-slate-400',
  SYSTEM_GRAY4: 'border-slate-300',
  SYSTEM_GRAY5: 'border-slate-200',
  SYSTEM_GRAY6: 'border-slate-100',
  SYSTEM_GREEN: 'border-green-500',
  SYSTEM_INDIGO: 'border-indigo-500',
  SYSTEM_LIME: 'border-lime-500',
  SYSTEM_MINT: 'border-emerald-400',
  SYSTEM_ORANGE: 'border-orange-500',
  SYSTEM_PINK: 'border-pink-500',
  SYSTEM_PURPLE: 'border-purple-500',
  SYSTEM_RED: 'border-red-500',
  SYSTEM_TEAL: 'border-teal-500',
  SYSTEM_YELLOW: 'border-yellow-500',
  LABEL_SECONDARY: 'border-slate-300',
  LIGHT_GRAY: 'border-slate-200',
  DARK_GRAY: 'border-slate-700',
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

  if (modifier.borderColor) {
    classes.push('border', borderColorMap[modifier.borderColor] ?? '');
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
