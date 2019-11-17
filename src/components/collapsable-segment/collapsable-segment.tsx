import * as React from 'react';
import { Segment, StrictSegmentProps, Label } from 'semantic-ui-react';

export interface ICollpasableSegmentProps extends StrictSegmentProps {
  title: string;
  titleColor?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'olive'
    | 'green'
    | 'teal'
    | 'blue'
    | 'violet'
    | 'purple'
    | 'pink'
    | 'brown'
    | 'grey'
    | 'black'
    | undefined;
  style?: { [key: string]: any };
  children?: any;
}

export const CollapsableSegment: React.FC<
  ICollpasableSegmentProps
> = React.memo((props: ICollpasableSegmentProps) => {
  const { content, title, titleColor, children, ...segmentProps } = props;

  const [isCollapsed, setCollapsed] = React.useState(false);

  const renderedChildren = React.useMemo(
    () => (
      <>
        {content}
        {children}
      </>
    ),
    [content, children, isCollapsed]
  );

  return (
    <Segment {...segmentProps}>
      <Label
        icon={isCollapsed ? 'angle down' : 'angle right'}
        as='a'
        color={titleColor}
        content={title}
        onClick={() => setCollapsed(prev => !prev)}
      />
      {!isCollapsed ? renderedChildren : null}
    </Segment>
  );
});
