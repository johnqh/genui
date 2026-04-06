import { fireEvent, render, screen } from '@testing-library/react';
import { GenUI } from '../gen-ui';
import { ViewLayout, type IRenderable } from '../types';

describe('GenUI', () => {
  it('renders a simple titled render tree', () => {
    const renderable: IRenderable = {
      id: 'article',
      view: {
        layout: ViewLayout.LINE_TITLE_SUBTITLE_VALUE,
        title: { text: 'Inbox Zero' },
        subtitle: { text: 'Keep mail under control' },
        valueText: { text: '12' },
      },
    };

    render(<GenUI renderable={renderable} />);

    expect(screen.getByText('Inbox Zero')).toBeInTheDocument();
    expect(screen.getByText('Keep mail under control')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('invokes onAction for actionable controls using destination.value', () => {
    const onAction = vi.fn();
    const renderable: IRenderable = {
      id: 'open-compose',
      view: {
        layout: ViewLayout.ACTION,
        title: { text: 'Compose' },
      },
      destination: {
        value: 'compose',
      },
    };

    render(<GenUI renderable={renderable} onAction={onAction} />);

    fireEvent.click(screen.getByRole('button', { name: 'Compose' }));

    expect(onAction).toHaveBeenCalledWith('compose', renderable);
  });

  it('reports text input changes through onAction', () => {
    const onAction = vi.fn();
    const renderable: IRenderable = {
      id: 'subject',
      view: {
        layout: ViewLayout.INPUT_TEXT,
        title: { text: 'Subject' },
        valueText: { text: 'Draft' },
      },
    };

    render(<GenUI renderable={renderable} onAction={onAction} />);

    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Updated subject' },
    });

    expect(onAction).toHaveBeenCalledWith('Updated subject', renderable);
  });

  it('reports toggle changes through onAction', () => {
    const onAction = vi.fn();
    const renderable: IRenderable = {
      id: 'notifications',
      view: {
        layout: ViewLayout.LINE_TOGGLE,
        title: { text: 'Notifications' },
        valueText: { text: '0' },
      },
    };

    render(<GenUI renderable={renderable} onAction={onAction} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(onAction).toHaveBeenCalledWith('true', renderable);
  });

  it('reports select changes through onAction', () => {
    const onAction = vi.fn();
    const renderable: IRenderable = {
      id: 'priority',
      view: {
        layout: ViewLayout.LINE_SELECT,
        title: { text: 'Priority' },
        valueText: { text: 'normal' },
        children: [
          {
            id: 'priority-low',
            view: {
              title: { text: 'Low' },
            },
            destination: {
              value: 'low',
            },
          },
          {
            id: 'priority-normal',
            view: {
              title: { text: 'Normal' },
            },
            destination: {
              value: 'normal',
            },
          },
          {
            id: 'priority-high',
            view: {
              title: { text: 'High' },
            },
            destination: {
              value: 'high',
            },
          },
        ],
      },
    };

    render(<GenUI renderable={renderable} onAction={onAction} />);

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('High'));

    expect(onAction).toHaveBeenCalledWith('high', renderable);
  });
});
