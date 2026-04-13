export const FontWeight = {
  TITLE: 'TITLE',
  SUBTITLE: 'SUBTITLE',
  BODY: 'BODY',
  VALUE: 'VALUE',
  FOOTNOTE: 'FOOTNOTE',
} as const;

export type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];

export const ThemeColor = {
  NONE: 'NONE',
  CLEAR: 'CLEAR',
  LABEL: 'LABEL',
  LABEL_SECONDARY: 'LABEL_SECONDARY',
  LABEL_TERTIARY: 'LABEL_TERTIARY',
  LABEL_QUATERNARY: 'LABEL_QUATERNARY',
  BACKGROUND: 'BACKGROUND',
  BACKGROUND_SECONDARY: 'BACKGROUND_SECONDARY',
  BACKGROUND_TERTIARY: 'BACKGROUND_TERTIARY',
  BACKGROUND_QUATERNARY: 'BACKGROUND_QUATERNARY',
  BACKGROUND_GROUPED: 'BACKGROUND_GROUPED',
  BACKGROUND_GROUPED_SECONDARY: 'BACKGROUND_GROUPED_SECONDARY',
  BACKGROUND_GROUPED_TERTIARY: 'BACKGROUND_GROUPED_TERTIARY',
  TABLE_BACKGROUND: 'BACKGROUND_TABLE',
  TABLE_CELL_BLUE_TEXT: 'TABLE_CELL_BLUE_TEXT',
  FILL: 'FILL',
  FILL_SECONDARY: 'FILL_SECONDARY',
  FILL_TERTIARY: 'FILL_TERTIARY',
  FILL_QUANTERNARY: 'FILL_QUANTERNARY',
  LINK: 'LINK',
  SEPARATOR: 'SEPARATOR',
  SEPARATOR_OPAQUE: 'SEPARATOR_OPAQUE',
  TEXT_PLACEHOLDER: 'TEXT_PLACEHOLDER',
  SYSTEM_BLUE: 'SYSTEM_BLUE',
  SYSTEM_BROWN: 'SYSTEM_BROWN',
  SYSTEM_CYAN: 'SYSTEM_CYAN',
  SYSTEM_GRAY: 'SYSTEM_GRAY',
  SYSTEM_GRAY2: 'SYSTEM_GRAY2',
  SYSTEM_GRAY3: 'SYSTEM_GRAY3',
  SYSTEM_GRAY4: 'SYSTEM_GRAY4',
  SYSTEM_GRAY5: 'SYSTEM_GRAY5',
  SYSTEM_GRAY6: 'SYSTEM_GRAY6',
  SYSTEM_GREEN: 'SYSTEM_GREEN',
  SYSTEM_INDIGO: 'SYSTEM_INDIGO',
  SYSTEM_LIME: 'SYSTEM_LIME',
  SYSTEM_MINT: 'SYSTEM_MINT',
  SYSTEM_ORANGE: 'SYSTEM_ORANGE',
  SYSTEM_PINK: 'SYSTEM_PINK',
  SYSTEM_PURPLE: 'SYSTEM_PURPLE',
  SYSTEM_RED: 'SYSTEM_RED',
  SYSTEM_TEAL: 'SYSTEM_TEAL',
  SYSTEM_YELLOW: 'SYSTEM_YELLOW',
  BLACK: 'BLACK',
  WHITE: 'WHITE',
  DARK_GRAY: 'DARK_GRAY',
  LIGHT_GRAY: 'LIGHT_GRAY',
  ACTION_BACKGROUND: 'ACTION_BACKGROUND',
  ACTION_BACKGROUND_SECONDARY: 'ACTION_BACKGROUND_SECONDARY',
  ACTION_BACKGROUND_DESTRUCTIVE: 'ACTION_BACKGROUND_DESTRUCTIVE',
  ACTION_BORDER: 'ACTION_BORDER',
  ACTION_BORDER_SECONDARY: 'ACTION_BORDER_SECONDARY',
  ACTION_BORDER_DESTRUCTIVE: 'ACTION_BORDER_DESTRUCTIVE',
  ACTION_TEXT: 'ACTION_TEXT',
  ACTION_TEXT_SECONDARY: 'ACTION_TEXT_SECONDARY',
  ACTION_TEXT_DESTRUCTIVE: 'ACTION_TEXT_DESTRUCTIVE',
  NAV_BACKGROUND: 'NAV_BACKGROUND',
  NAVITEM_BACKGROUND: 'NAVITEM_BACKGROUND',
  NAVITEM_BACKGROUND_SELECTED: 'NAVITEM_BACKGROUND_SELECTED',
  NAVITEM_TEXT: 'NAVITEM_TEXT',
  NAVITEM_TEXT_SELECTED: 'NAVITEM_TEXT_SELECTED',
  DISABLED: 'DISABLED',
  SELECTED: 'SELECTED',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  WARNING_SECONDARY: 'WARNING_SECONDARY',
  ERROR: 'ERROR',
} as const;

export type ThemeColor = (typeof ThemeColor)[keyof typeof ThemeColor];

export const ScreenLayout = {
  TABS: 'tabs',
  SUBMENU: 'submenu',
  VIEW: 'view',
  ROOT: 'root',
} as const;

export type ScreenLayout = (typeof ScreenLayout)[keyof typeof ScreenLayout];

export const ViewLayout = {
  NAV_ITEM: 'nav_item',
  NAV_IMAGE_ITEM: 'nav_image_item',
  LIST: 'list',
  LIST_SIMPLE: 'list_simple',
  LIST_SECTIONED: 'list_sectioned',
  LIST_PARAGRAPHS: 'list_paragraphs',
  GRID: 'grid',
  GRID_SIMPLE: 'grid_simple',
  GRID_SECTIONED: 'grid_sectioned',
  CAROUSAL: 'carousel',
  MAP: 'map',
  MAP_PIN: 'map_pin',
  STACKED: 'stacked',
  STACKED_HORIZONTAL: 'stacked_horizontal',
  STACKED_VERTICAL: 'stacked_vertical',
  STACKED_DYNAMIC: 'stacked_dynamic',
  CALENDAR: 'calendar',
  SPACED_HORIZONTAL: 'spaced_horizontal',
  SPACED_VERTICAL: 'spaced_vertical',
  SPACER_HORIZONTAL: 'spacer_horizontal',
  SPACER_VERTICAL: 'spacer_vertical',
  ACTION: 'action',
  CENTER: 'center',
  CENTER_IMAGE: 'center_image',
  JUST_IMAGE: 'just_image',
  CHIP: 'chip',
  FAB: 'fab',
  FAB_MINI: 'fab_mini',
  FAB_EXTENDED: 'fab_extended',
  FOOTER: 'footer',
  HEADER: 'header',
  EMBEDDED_IMAGE: 'embedded_image',
  INPUT_TEXT: 'input_text',
  INPUT_NUMERIC: 'input_numeric',
  INPUT_PASSWORD: 'input_password',
  INPUT_EMAIL: 'input_email',
  INPUT_PHONE: 'input_phone',
  INPUT_DATE: 'input_date',
  INPUT_TEXT_BLOCK: 'input_text_block',
  LINE_ACTION: 'line_action',
  LINE_TITLE: 'line_title',
  LINE_TEXT: 'line_text',
  LINE_TITLE_VALUE: 'line_title_value',
  LINE_TITLE_SUBTITLE: 'line_title_subtitle',
  LINE_TITLE_SUBTITLE_VALUE: 'line_title_subtitle_value',
  LINE_TITLE_DETAIL: 'line_title_detail',
  LINE_IMAGE_TITLE: 'line_image_title',
  LINE_IMAGE_TITLE_SUBTITLE: 'line_image_title_subtitle',
  LINE_IMAGE_TITLE_SUBTITLE_VALUE: 'line_image_title_subtitle_value',
  LINE_SELECT: 'line_select',
  LINE_SLIDER: 'line_slider',
  LINE_TOGGLE: 'line_toggle',
  LINK: 'link',
  SEARCH: 'search',
  TABS_FIXED: 'tabs_fixed',
  TABS_SCROLLABLE: 'tabs_scrollable',
  PARAGRAPH: 'paragraph',
  TEXT_MARKUP: 'text_markup',
  TILE: 'tile',
  WAITING: 'waiting',
  WEB: 'web',
} as const;

export type ViewLayout = (typeof ViewLayout)[keyof typeof ViewLayout];

export interface IRenderableLabelModifier {
  color?: ThemeColor | null;
  fontWeight?: FontWeight | null;
}

export interface IRenderableLabel {
  text: string;
  modifier?: IRenderableLabelModifier | null;
}

export interface IRenderableImageModifier {
  tintColor?: ThemeColor | null;
}

export interface IRenderableImage {
  local?: string;
  url?: string;
  modifier?: IRenderableImageModifier | null;
}

export interface IRenderableUrl {
  url: string;
}

export interface IRenderableLocation {
  lat: number;
  long: number;
}

export interface IRenderableViewModifier {
  bgColor?: ThemeColor | null;
  borderColor?: ThemeColor | null;
  width?: number | null;
  height?: number | null;
  spacing?: number | null;
}

export interface IRenderableView {
  layout?: string | null;
  modifier?: IRenderableViewModifier | null;
  buttonModifier?: IRenderableViewModifier | null;
  children?: IRenderable[] | null;
  title?: IRenderableLabel | null;
  subtitle?: IRenderableLabel | null;
  valueText?: IRenderableLabel | null;
  details?: IRenderableLabel | null;
  image?: IRenderableImage | null;
  icon?: IRenderableImage | null;
  background?: IRenderableImage | null;
  indicator?: IRenderableImage | null;
  url?: IRenderableUrl | null;
}

export interface IRenderableAction {
  route?: string | null;
  value?: string | null;
}

export interface IRenderableScreenModifier {
  leftActions?: IRenderable[] | null;
  rightActions?: IRenderable[] | null;
  bottomActions?: IRenderable[] | null;
}

export interface IScreenSEO {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
}

export interface IRenderableScreen extends IRenderableAction {
  zOrder?: number;
  screenLayout?: string;
  view: IRenderableView;
  seo?: IScreenSEO | null;
  modifier?: IRenderableScreenModifier | null;
}

export interface IRenderable {
  id: string;
  view?: IRenderableView | null;
  destination?: IRenderableAction | IRenderableScreen | null;
  location?: IRenderableLocation | null;
  final?: boolean;
  parent?: IRenderable | null;
}

export type GenUIActionHandler = (
  value: string,
  renderable: IRenderable
) => void;

export interface GenUIProps {
  renderable: IRenderable;
  onAction?: GenUIActionHandler;
  className?: string;
  googleMapsApiKey?: string;
}
