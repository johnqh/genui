import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import { GoogleMapsApiKeyContext } from './gen-ui';
import {
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
import { cn } from '@sudobility/design';
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
  const isList = view.layout?.startsWith('list');
  const isHorizontal =
    view.layout === 'stacked_horizontal' || view.layout === 'spaced_horizontal';

  return (
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
      <Stack spacing='md'>
        {titleBlock(view)}
        <div
          className={cn(
            isGrid
              ? 'grid grid-cols-1 gap-4 md:grid-cols-2'
              : isHorizontal
                ? 'flex flex-nowrap gap-4 overflow-x-auto'
                : isList
                  ? 'flex flex-col'
                  : 'flex flex-col gap-4'
          )}
          style={resolveDimensionStyle(view.modifier)}
        >
          {isGrid
            ? (view.children ?? []).map(child => (
                <div
                  key={child.id}
                  className='aspect-[4/3] overflow-hidden lg:aspect-video'
                >
                  <RenderNode renderable={child} onAction={onAction} />
                </div>
              ))
            : renderChildren(view.children, onAction)}
        </div>
      </Stack>
    </div>
  );
};

// Critical Swiper CSS injected inline so the carousel works without
// the consuming app needing to import swiper/css separately.
const SWIPER_CRITICAL_CSS = `
.swiper{overflow:hidden;position:relative}
.swiper-wrapper{display:flex;position:relative;width:100%;height:100%;z-index:1;transition-property:transform;box-sizing:content-box}
.swiper-slide{flex-shrink:0;position:relative;transition-property:transform}
.swiper-3d,.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}
.swiper-3d .swiper-wrapper{transform-style:preserve-3d}
.swiper-3d .swiper-slide{transform-style:preserve-3d}
.swiper-3d .swiper-slide-shadow-left,.swiper-3d .swiper-slide-shadow-right{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}
.swiper-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}
.swiper-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}
.swiper-pagination{text-align:center;position:absolute;bottom:0;width:100%;z-index:10}
.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:50%;background:#000;opacity:.2;cursor:pointer;margin:0 4px}
.swiper-pagination-bullet-active{opacity:1;background:#007aff}
`;

let swiperCssInjected = false;

const ensureSwiperCss = () => {
  if (swiperCssInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-genui-swiper', '');
  style.textContent = SWIPER_CRITICAL_CSS;
  document.head.appendChild(style);
  swiperCssInjected = true;
};

const renderCarousel = (
  _renderable: IRenderable,
  view: IRenderableView,
  onAction?: GenUIActionHandler
) => {
  const children = view.children ?? [];
  ensureSwiperCss();

  return (
    <div className='w-full overflow-hidden'>
      {titleBlock(view) ? <div className='mb-4'>{titleBlock(view)}</div> : null}
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect='coverflow'
        grabCursor
        centeredSlides
        slidesPerView='auto'
        slideToClickedSlide
        coverflowEffect={{
          rotate: -30,
          stretch: '10%',
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        style={{ paddingBottom: '30px', perspective: '1200px' }}
        onSwiper={swiper => {
          if (swiper.wrapperEl) {
            swiper.wrapperEl.style.transformStyle = 'preserve-3d';
          }
        }}
      >
        {children.map(child => (
          <SwiperSlide
            key={child.id}
            style={{
              width: '90%',
              maxWidth: '340px',
              transformStyle: 'preserve-3d' as const,
            }}
          >
            <div className='w-full'>
              <RenderNode renderable={child} onAction={onAction} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Map (Google Maps via @vis.gl/react-google-maps)
// ---------------------------------------------------------------------------

const FitBounds: React.FC<{
  locations: { lat: number; lng: number }[];
}> = ({ locations }) => {
  const map = useMap();
  React.useEffect(() => {
    if (!map || locations.length < 2) return;
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(loc => bounds.extend(loc));
    map.fitBounds(bounds, 50);
  }, [map, locations]);
  return null;
};

const MapPinMarker: React.FC<{
  position: { lat: number; lng: number };
  title?: string;
  subtitle?: string;
  details?: string;
}> = ({ position, title, subtitle, details }) => {
  const [open, setOpen] = React.useState(false);
  const hasInfo = !!(subtitle || details);

  return (
    <AdvancedMarker
      position={position}
      title={title}
      onClick={hasInfo ? () => setOpen(o => !o) : undefined}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'translateY(-50%)',
        }}
      >
        <svg
          width='25'
          height='41'
          viewBox='0 0 25 41'
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,.4))' }}
        >
          <path
            d='M12.5 0C5.6 0 0 5.6 0 12.5 0 21.875 12.5 41 12.5 41S25 21.875 25 12.5C25 5.6 19.4 0 12.5 0z'
            fill='#e74c3c'
            stroke='#c0392b'
            strokeWidth='1'
          />
          <circle cx='12.5' cy='12.5' r='5' fill='#fff' />
        </svg>
        {title ? (
          <span
            style={{
              marginTop: 2,
              padding: '2px 6px',
              background: '#fff',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(0,0,0,.2)',
              color: '#333',
            }}
          >
            {title}
          </span>
        ) : null}
      </div>
      {hasInfo && open ? (
        <InfoWindow onCloseClick={() => setOpen(false)}>
          <div>
            {subtitle ? <div>{subtitle}</div> : null}
            {details ? <div>{details}</div> : null}
          </div>
        </InfoWindow>
      ) : null}
    </AdvancedMarker>
  );
};

const MapPinNode: React.FC<{
  renderable: IRenderable;
  view: IRenderableView;
}> = ({ renderable, view }) => {
  const apiKey = React.useContext(GoogleMapsApiKeyContext);
  const loc = renderable.location;
  if (!loc || !apiKey) return null;

  const title = labelText(view.title);

  return (
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
      <Stack spacing='md'>
        {titleBlock(view)}
        <div
          className='overflow-hidden'
          style={{ height: view.modifier?.height ?? 300 }}
        >
          <APIProvider apiKey={apiKey}>
            <GoogleMap
              defaultCenter={{ lat: loc.lat, lng: loc.long }}
              defaultZoom={13}
              gestureHandling='greedy'
              mapId='genui-map'
            >
              <MapPinMarker
                position={{ lat: loc.lat, lng: loc.long }}
                title={title}
                subtitle={view.subtitle?.text ?? undefined}
                details={view.details?.text ?? undefined}
              />
            </GoogleMap>
          </APIProvider>
        </div>
      </Stack>
    </div>
  );
};

const MapNode: React.FC<{
  renderable: IRenderable;
  view: IRenderableView;
  onAction?: GenUIActionHandler;
}> = ({ renderable: _renderable, view, onAction }) => {
  const apiKey = React.useContext(GoogleMapsApiKeyContext);
  const children = view.children ?? [];
  const locatedChildren = children.filter(c => c.location);

  if (!apiKey || locatedChildren.length === 0) {
    return (
      <div className='w-full'>
        <Stack spacing='md'>
          {titleBlock(view)}
          <Text as='div' size='sm' color='muted'>
            {!apiKey
              ? 'Google Maps API key not provided.'
              : 'No locations to display.'}
          </Text>
        </Stack>
      </div>
    );
  }

  const lats = locatedChildren.map(c => c.location!.lat);
  const lngs = locatedChildren.map(c => c.location!.long);
  const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

  const locations = locatedChildren.map(c => ({
    lat: c.location!.lat,
    lng: c.location!.long,
  }));

  return (
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
      <Stack spacing='md'>
        {titleBlock(view)}
        <div
          className='overflow-hidden'
          style={{ height: view.modifier?.height ?? 400 }}
        >
          <APIProvider apiKey={apiKey}>
            <GoogleMap
              defaultCenter={{ lat: centerLat, lng: centerLng }}
              defaultZoom={5}
              gestureHandling='greedy'
              mapId='genui-map'
            >
              <FitBounds locations={locations} />
              {locatedChildren.map(child => {
                const childView = child.view;
                const pinTitle = labelText(childView?.title);
                const value = actionValueOf(child);

                return (
                  <AdvancedMarker
                    key={child.id}
                    position={{
                      lat: child.location!.lat,
                      lng: child.location!.long,
                    }}
                    title={pinTitle}
                    onClick={
                      onAction && value !== undefined
                        ? () => onAction(value, child)
                        : undefined
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <svg
                        width='25'
                        height='41'
                        viewBox='0 0 25 41'
                        style={{
                          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,.4))',
                        }}
                      >
                        <path
                          d='M12.5 0C5.6 0 0 5.6 0 12.5 0 21.875 12.5 41 12.5 41S25 21.875 25 12.5C25 5.6 19.4 0 12.5 0z'
                          fill='#e74c3c'
                          stroke='#c0392b'
                          strokeWidth='1'
                        />
                        <circle cx='12.5' cy='12.5' r='5' fill='#fff' />
                      </svg>
                      {pinTitle ? (
                        <span
                          style={{
                            marginTop: 2,
                            padding: '2px 6px',
                            background: '#fff',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            boxShadow: '0 1px 3px rgba(0,0,0,.2)',
                            color: '#333',
                          }}
                        >
                          {pinTitle}
                        </span>
                      ) : null}
                    </div>
                  </AdvancedMarker>
                );
              })}
            </GoogleMap>
          </APIProvider>
        </div>
      </Stack>
    </div>
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
      animation='none'
      disabled={disabled}
      className={cn(
        'justify-start',
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
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
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
    </div>
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
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
      <HStack justify='between' align='center' full>
        {titleBlock(view)}
        <Switch
          checked={checked}
          onCheckedChange={nextValue =>
            onAction?.(nextValue ? 'true' : 'false', renderable)
          }
        />
      </HStack>
    </div>
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
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
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
    </div>
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
    <div className={cn('w-full', resolveViewModifierClasses(view.modifier))}>
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
    </div>
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
      'flex w-full items-center justify-center',
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
      className={cn('w-full', resolveViewModifierClasses(view.modifier))}
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
      'flex w-full flex-col items-center justify-center gap-2 text-center',
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
        'h-full w-full object-cover',
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
          className='mb-2 w-full object-cover'
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
      className={cn('w-full', resolveViewModifierClasses(view.modifier))}
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
        'flex items-center gap-3',
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
    className={cn('w-full', resolveViewModifierClasses(view.modifier))}
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

  if (layout === 'map_pin') {
    return <MapPinNode renderable={renderable} view={view} />;
  }

  if (layout === 'map') {
    return <MapNode renderable={renderable} view={view} onAction={onAction} />;
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
