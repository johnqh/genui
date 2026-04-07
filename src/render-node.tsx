import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {
  Box,
  Button,
  HStack,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Stack,
  Switch,
  Text,
  TextArea,
} from '@sudobility/components';
import { cn, ui } from '@sudobility/design';
import type { GenUIActionHandler, IRenderable, IRenderableView } from './types';
import {
  actionValueOf,
  imageSrc,
  inputTypeForLayout,
  isInputLayout,
  labelText,
  viewOf,
} from './utils';
import {
  resolveDimensionStyle,
  resolveTextClasses,
  resolveViewModifierClasses,
} from './theme';

interface RenderNodeProps {
  renderable: IRenderable;
  onAction?: GenUIActionHandler;
}

const renderImage = (
  image?:
    | IRenderableView['image']
    | IRenderableView['icon']
    | IRenderableView['background']
) => {
  const src = imageSrc(image);
  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt=''
      aria-hidden='true'
      className='h-10 w-10 rounded-md object-cover'
    />
  );
};

const titleBlock = (view: IRenderableView) => {
  const title = labelText(view.title);
  const subtitle = labelText(view.subtitle);
  const details = labelText(view.details);

  if (!title && !subtitle && !details) {
    return null;
  }

  return (
    <Stack spacing='xs' className='min-w-0 flex-1'>
      {title ? (
        <Text
          as='div'
          weight='semibold'
          className={cn(
            'break-words',
            resolveTextClasses(view.title?.modifier)
          )}
        >
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text
          as='div'
          size='sm'
          color='muted'
          className={cn(
            'break-words',
            resolveTextClasses(view.subtitle?.modifier)
          )}
        >
          {subtitle}
        </Text>
      ) : null}
      {details ? (
        <Text
          as='div'
          size='sm'
          color='muted'
          className={cn(
            'break-words',
            resolveTextClasses(view.details?.modifier)
          )}
        >
          {details}
        </Text>
      ) : null}
    </Stack>
  );
};

const CollectionLayouts = new Set([
  'list',
  'list_simple',
  'list_sectioned',
  'list_paragraphs',
  'grid',
  'grid_simple',
  'grid_sectioned',
  'carousel',
  'map',
  'calendar',
  'stacked',
  'stacked_horizontal',
  'stacked_vertical',
  'stacked_dynamic',
  'tabs_fixed',
  'tabs_scrollable',
  'spaced_horizontal',
  'spaced_vertical',
  'header',
]);

const ActionLayouts = new Set([
  'action',
  'line_action',
  'fab',
  'fab_mini',
  'fab_extended',
  'link',
  'nav_item',
  'nav_image_item',
  'tile',
  'chip',
]);

const LineLayouts = new Set([
  'line_title',
  'line_text',
  'line_title_value',
  'line_title_subtitle',
  'line_title_subtitle_value',
  'line_title_detail',
  'line_image_title',
  'line_image_title_subtitle',
  'line_image_title_subtitle_value',
]);

const renderChildren = (
  children: IRenderable[] | null | undefined,
  onAction?: GenUIActionHandler
) => {
  if (!children?.length) {
    return null;
  }

  return children.map(child => (
    <RenderNode key={child.id} renderable={child} onAction={onAction} />
  ));
};

const renderCollection = (
  _renderable: IRenderable,
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const isGrid = view.layout?.startsWith('grid');
  const isHorizontal =
    view.layout === 'stacked_horizontal' || view.layout === 'spaced_horizontal';

  return (
    <Box
      p='md'
      rounded='lg'
      border
      className={cn(
        'w-full',
        resolveViewModifierClasses(view.modifier),
        !view.modifier?.borderColor && 'border-slate-200'
      )}
    >
      <Stack spacing='md'>
        {titleBlock(view)}
        <div
          className={cn(
            isGrid
              ? 'grid grid-cols-1 gap-4 md:grid-cols-2'
              : isHorizontal
                ? 'flex flex-nowrap gap-4 overflow-x-auto'
                : 'flex flex-col gap-4'
          )}
          style={resolveDimensionStyle(view.modifier)}
        >
          {renderChildren(view.children, onAction)}
        </div>
      </Stack>
    </Box>
  );
};

const renderCarousel = (
  _renderable: IRenderable,
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const children = view.children ?? [];

  return (
    <Box
      p='md'
      rounded='lg'
      border
      className={cn(
        'w-full',
        resolveViewModifierClasses(view.modifier),
        !view.modifier?.borderColor && 'border-slate-200'
      )}
    >
      <Stack spacing='md'>
        {titleBlock(view)}
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect='coverflow'
          grabCursor
          centeredSlides
          slidesPerView='auto'
          slideToClickedSlide
          coverflowEffect={{
            rotate: 30,
            stretch: '10%',
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          style={{ paddingBottom: '30px', width: '100%' }}
        >
          {children.map(child => (
            <SwiperSlide
              key={child.id}
              style={{ width: '80%', maxWidth: '340px' }}
            >
              <Box
                p='md'
                rounded='lg'
                border
                className='border-slate-200 h-full'
              >
                <RenderNode renderable={child} onAction={onAction} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Stack>
    </Box>
  );
};

const renderAction = (
  renderable: IRenderable,
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const value = actionValueOf(renderable);
  const disabled = !onAction || value === undefined;
  const title = labelText(view.title) || renderable.id;

  return (
    <Button
      type='button'
      variant='secondary'
      disabled={disabled}
      className={cn(
        'w-full justify-start',
        resolveViewModifierClasses(view.buttonModifier ?? view.modifier)
      )}
      onClick={() => {
        if (!disabled && value !== undefined) {
          onAction(value, renderable);
        }
      }}
    >
      <HStack justify='between' align='center' full>
        <HStack align='center' spacing='sm'>
          {renderImage(view.image ?? view.icon)}
          <Stack spacing='xs'>
            <Text
              as='span'
              weight='semibold'
              className={resolveTextClasses(view.title?.modifier)}
            >
              {title}
            </Text>
            {view.subtitle?.text ? (
              <Text as='span' size='sm' color='muted'>
                {view.subtitle.text}
              </Text>
            ) : null}
          </Stack>
        </HStack>
        {view.valueText?.text ? (
          <Text as='span' size='sm' color='muted'>
            {view.valueText.text}
          </Text>
        ) : null}
      </HStack>
    </Button>
  );
};

interface InteractiveNodeProps {
  renderable: IRenderable;
  view: IRenderableView;
  onAction?: GenUIActionHandler;
}

const InputNode: React.FC<InteractiveNodeProps> = ({
  renderable,
  view,
  onAction,
}) => {
  const [value, setValue] = React.useState(view.valueText?.text ?? '');
  const title = labelText(view.title);
  const helper = labelText(view.subtitle);

  const emit = (nextValue: string) => {
    setValue(nextValue);
    onAction?.(nextValue, renderable);
  };

  return (
    <Box
      p='md'
      rounded='lg'
      border
      className={cn(
        'w-full',
        resolveViewModifierClasses(view.modifier),
        !view.modifier?.borderColor && 'border-slate-200'
      )}
    >
      <Stack spacing='sm'>
        {title ? (
          <Text
            as='label'
            size='sm'
            weight='medium'
            className={resolveTextClasses(view.title?.modifier)}
          >
            {title}
          </Text>
        ) : null}
        {view.layout === 'input_text_block' ? (
          <TextArea
            value={value}
            onChange={emit}
            placeholder={helper || title || 'Enter text'}
            textareaProps={{
              'aria-label': title || renderable.id,
            }}
          />
        ) : (
          <Input
            value={value}
            type={inputTypeForLayout(view.layout)}
            aria-label={title || renderable.id}
            placeholder={helper || title || 'Enter value'}
            onChange={event => emit(event.target.value)}
          />
        )}
        {helper ? (
          <Text as='span' size='sm' color='muted'>
            {helper}
          </Text>
        ) : null}
      </Stack>
    </Box>
  );
};

const renderToggle = (
  renderable: IRenderable,
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const checked = ['1', 'true', 'yes', 'on'].includes(
    (view.valueText?.text ?? '').toLowerCase()
  );

  return (
    <Box
      p='md'
      rounded='lg'
      border
      className={cn(
        'w-full border-slate-200',
        resolveViewModifierClasses(view.modifier)
      )}
    >
      <HStack justify='between' align='center' full>
        {titleBlock(view)}
        <Switch
          checked={checked}
          onCheckedChange={nextValue =>
            onAction?.(nextValue ? 'true' : 'false', renderable)
          }
        />
      </HStack>
    </Box>
  );
};

const SliderNode: React.FC<InteractiveNodeProps> = ({
  renderable,
  view,
  onAction,
}) => {
  const initialValue = Number(view.valueText?.text ?? 0);
  const [value, setValue] = React.useState(
    Number.isFinite(initialValue) ? initialValue : 0
  );

  return (
    <Box
      p='md'
      rounded='lg'
      border
      className={cn(
        'w-full border-slate-200',
        resolveViewModifierClasses(view.modifier)
      )}
    >
      <Stack spacing='sm'>
        <HStack justify='between' align='center'>
          {titleBlock(view)}
          <Text as='span' size='sm' color='muted'>
            {value}
          </Text>
        </HStack>
        <input
          aria-label={labelText(view.title) || renderable.id}
          type='range'
          value={value}
          onChange={event => {
            const nextValue = Number(event.target.value);
            setValue(nextValue);
            onAction?.(String(nextValue), renderable);
          }}
          className='w-full accent-blue-600'
        />
      </Stack>
    </Box>
  );
};

const renderSelect = (
  renderable: IRenderable,
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const options = view.children ?? [];
  const defaultValue =
    view.valueText?.text ??
    actionValueOf(options[0] ?? { id: '', destination: null, view: null });

  return (
    <Box
      p='md'
      rounded='lg'
      border
      className={cn(
        'w-full border-slate-200',
        resolveViewModifierClasses(view.modifier)
      )}
    >
      <Stack spacing='sm'>
        {titleBlock(view)}
        <Select
          defaultValue={defaultValue}
          onValueChange={value => onAction?.(value, renderable)}
        >
          <SelectTrigger aria-label={labelText(view.title) || renderable.id}>
            <SelectValue placeholder='Select an option' />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => {
              const optionView = option.view;
              const optionValue =
                actionValueOf(option) ??
                optionView?.valueText?.text ??
                option.id;
              const optionLabel =
                optionView?.title?.text ??
                optionView?.valueText?.text ??
                option.id;

              return (
                <SelectItem key={option.id} value={optionValue}>
                  {optionLabel}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </Stack>
    </Box>
  );
};

const renderSpacer = (view: IRenderableView) => (
  <div
    aria-hidden='true'
    style={{
      width: view.modifier?.width ?? undefined,
      height: view.modifier?.height ?? 16,
    }}
  />
);

const renderWaiting = (view: IRenderableView) => (
  <div
    className={cn(
      'flex w-full items-center justify-center py-8',
      resolveViewModifierClasses(view.modifier)
    )}
  >
    <div className='h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600' />
    {labelText(view.title) ? (
      <Text as='div' size='sm' color='muted' className='ml-3'>
        {labelText(view.title)}
      </Text>
    ) : null}
  </div>
);

const renderWeb = (view: IRenderableView) => {
  const url = view.url?.url;
  if (!url) {
    return null;
  }

  return (
    <iframe
      src={url}
      title={labelText(view.title) || 'Embedded content'}
      className={cn(
        'w-full rounded-lg border border-slate-200',
        resolveViewModifierClasses(view.modifier)
      )}
      style={{
        height: view.modifier?.height ?? 400,
        width: view.modifier?.width ?? undefined,
      }}
    />
  );
};

const renderCenter = (view: IRenderableView, onAction?: GenUIActionHandler) => (
  <div
    className={cn(
      'flex w-full flex-col items-center justify-center gap-2 py-4 text-center',
      resolveViewModifierClasses(view.modifier)
    )}
    style={resolveDimensionStyle(view.modifier)}
  >
    {view.layout === 'center_image'
      ? renderImage(view.image ?? view.icon)
      : null}
    {titleBlock(view)}
    {view.valueText?.text ? (
      <Text
        as='div'
        size='sm'
        color='muted'
        className={resolveTextClasses(view.valueText.modifier)}
      >
        {view.valueText.text}
      </Text>
    ) : null}
    {view.children?.length ? renderChildren(view.children, onAction) : null}
  </div>
);

const renderJustImage = (view: IRenderableView) => {
  const src = imageSrc(view.image ?? view.icon);
  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={labelText(view.title) || ''}
      className={cn(
        'rounded-lg object-cover',
        resolveViewModifierClasses(view.modifier)
      )}
      style={{
        width: view.modifier?.width ?? undefined,
        height: view.modifier?.height ?? undefined,
      }}
    />
  );
};

const renderEmbeddedImage = (
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const src = imageSrc(view.image ?? view.icon);

  return (
    <div
      className={cn('w-full', resolveViewModifierClasses(view.modifier))}
      style={resolveDimensionStyle(view.modifier)}
    >
      {src ? (
        <img
          src={src}
          alt={labelText(view.title) || ''}
          className='mb-2 w-full rounded-lg object-cover'
        />
      ) : null}
      {titleBlock(view)}
      {view.children?.length ? renderChildren(view.children, onAction) : null}
    </div>
  );
};

const renderParagraph = (view: IRenderableView) => {
  const title = labelText(view.title);
  const detail = labelText(view.details);
  const text = title || detail || view.valueText?.text || '';

  if (!text) {
    return null;
  }

  return (
    <div
      className={cn('w-full', resolveViewModifierClasses(view.modifier))}
      style={resolveDimensionStyle(view.modifier)}
    >
      <Text
        as='div'
        className={cn(
          'whitespace-pre-wrap break-words',
          resolveTextClasses(
            view.title?.modifier ??
              view.details?.modifier ??
              view.valueText?.modifier
          )
        )}
      >
        {text}
      </Text>
    </div>
  );
};

const renderFooter = (view: IRenderableView) => {
  const text =
    labelText(view.title) ||
    labelText(view.details) ||
    view.valueText?.text ||
    '';

  if (!text) {
    return null;
  }

  return (
    <div
      className={cn('w-full py-2', resolveViewModifierClasses(view.modifier))}
      style={resolveDimensionStyle(view.modifier)}
    >
      <Text
        as='div'
        size='xs'
        color='muted'
        className={cn('text-center', resolveTextClasses(view.title?.modifier))}
      >
        {text}
      </Text>
    </div>
  );
};

const renderLine = (view: IRenderableView) => {
  const hasImage = view.layout?.startsWith('line_image');
  const title = labelText(view.title);
  const subtitle = labelText(view.subtitle);
  const value = view.valueText?.text;
  const detail = labelText(view.details);

  return (
    <div
      className={cn(
        'flex items-center gap-3 py-2',
        resolveViewModifierClasses(view.modifier)
      )}
      style={resolveDimensionStyle(view.modifier)}
    >
      {hasImage ? renderImage(view.image ?? view.icon) : null}
      <div className='min-w-0 flex-1'>
        {title ? (
          <Text
            as='div'
            weight='medium'
            className={cn(
              'break-words',
              resolveTextClasses(view.title?.modifier)
            )}
          >
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text
            as='div'
            size='sm'
            color='muted'
            className={cn(
              'break-words',
              resolveTextClasses(view.subtitle?.modifier)
            )}
          >
            {subtitle}
          </Text>
        ) : null}
        {detail ? (
          <Text
            as='div'
            size='sm'
            color='muted'
            className={cn(
              'break-words',
              resolveTextClasses(view.details?.modifier)
            )}
          >
            {detail}
          </Text>
        ) : null}
      </div>
      {value ? (
        <Text
          as='div'
          size='sm'
          color='muted'
          className={cn(
            'shrink-0',
            resolveTextClasses(view.valueText?.modifier)
          )}
        >
          {value}
        </Text>
      ) : null}
    </div>
  );
};

const renderBasicCard = (
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => (
  <div
    className={cn(
      'w-full rounded-lg border border-slate-200 p-4',
      'w-full',
      ui.background.surface,
      resolveViewModifierClasses(view.modifier)
    )}
    style={resolveDimensionStyle(view.modifier)}
  >
    <HStack align='start' spacing='sm'>
      {renderImage(view.image ?? view.icon)}
      <Stack spacing='sm' className='flex-1'>
        {titleBlock(view)}
        {view.valueText?.text ? (
          <Text
            as='div'
            size='sm'
            color='muted'
            className={resolveTextClasses(view.valueText.modifier)}
          >
            {view.valueText.text}
          </Text>
        ) : null}
        {view.children?.length ? renderChildren(view.children, onAction) : null}
      </Stack>
    </HStack>
  </div>
);

export const RenderNode: React.FC<RenderNodeProps> = ({
  renderable,
  onAction,
}) => {
  const view = viewOf(renderable);

  if (!view) {
    return null;
  }

  const layout = view.layout ?? '';

  if (layout === 'spacer_horizontal' || layout === 'spacer_vertical') {
    return renderSpacer(view);
  }

  if (layout === 'waiting') {
    return renderWaiting(view);
  }

  if (layout === 'web') {
    return renderWeb(view);
  }

  if (layout === 'just_image') {
    return renderJustImage(view);
  }

  if (layout === 'center' || layout === 'center_image') {
    return renderCenter(view, onAction);
  }

  if (layout === 'embedded_image') {
    return renderEmbeddedImage(view, onAction);
  }

  if (layout === 'paragraph' || layout === 'text_markup') {
    return renderParagraph(view);
  }

  if (layout === 'footer') {
    return renderFooter(view);
  }

  if (LineLayouts.has(layout)) {
    return renderLine(view);
  }

  if (layout === 'carousel') {
    return renderCarousel(renderable, view, onAction);
  }

  if (CollectionLayouts.has(layout)) {
    return renderCollection(renderable, view, onAction);
  }

  if (isInputLayout(view.layout)) {
    return (
      <InputNode renderable={renderable} view={view} onAction={onAction} />
    );
  }

  if (layout === 'line_toggle') {
    return renderToggle(renderable, view, onAction);
  }

  if (layout === 'line_slider') {
    return (
      <SliderNode renderable={renderable} view={view} onAction={onAction} />
    );
  }

  if (layout === 'line_select') {
    return renderSelect(renderable, view, onAction);
  }

  if (ActionLayouts.has(layout)) {
    return renderAction(renderable, view, onAction);
  }

  return renderBasicCard(view, onAction);
};
