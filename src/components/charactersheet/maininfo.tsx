import * as React from 'react';
import { GenericTable, CollapsableSegment } from '../';
import { Grid } from 'semantic-ui-react';

type colorValue =
  | 'red'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | undefined;

const colors = ['red', 'yellow', 'olive', 'green', 'teal', 'blue'];

interface InformationSection {
  title: string;
  values: string[];
  color?: colorValue;
  hasModifiers?: boolean;
  lines?: number;
  horizontal?: boolean;
  editable?: boolean;
}

const Backgrounds: InformationSection = {
  title: 'Backgrounds',
  values: ['Class', 'Level', 'Background', 'Race', 'Alignment', 'Experience']
};

const Modifiers: InformationSection = {
  title: 'Modifiers',
  values: [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
  ],
  hasModifiers: true
};

const EngagementStats: InformationSection = {
  title: 'Engagement Stats',
  values: ['AC', 'Initiative', 'Speed'],
  horizontal: true
};

const ConsumableStats: InformationSection = {
  title: 'Consumable Stats',
  values: ['Hit Points', 'Temporary HP', 'Spell Slots'],
  hasModifiers: true
};

const SavingThrows: InformationSection = {
  ...Modifiers,
  title: 'Saving Throws',
  editable: true
};

const ContentItems: { [key: string]: InformationSection } = {
  Modifiers,
  SavingThrows,
  Backgrounds,
  EngagementStats,
  ConsumableStats
};

export const MainInfo = () => {
  const contentItems = React.useMemo(
    () =>
      Object.keys(ContentItems).map(key => {
        const {
          title,
          lines,
          hasModifiers,
          horizontal,
          editable
        } = ContentItems[key];
        const color: colorValue = colors[
          (Math.random() * 100) % colors.length | 0
        ] as colorValue;
        return (
          <CollapsableSegment
            key={key}
            raised
            title={title}
            titleColor={color}
            content={
              <GenericTable
                fixed
                vertical={!horizontal}
                color={color}
                celled
                striped
                editable={editable}
                items={ContentItems[key].values.map((value: string) => {
                  return {
                    title: value,
                    key: `${key}_${value}`,
                    hasModifier: hasModifiers,
                    lines: lines
                  };
                })}
              />
            }
          />
        );
      }),
    []
  );
  return (
    <Grid columns='3'>
      <Grid.Column>{contentItems}</Grid.Column>
    </Grid>
  );
};
