import * as React from 'react';
import { Grid, Sticky, Menu, Header } from 'semantic-ui-react';

export const HeaderItems: { name: string; icon: string }[] = [
  {
    name: 'Home',
    icon: 'home'
  },
  {
    name: 'index',
    icon: 'search'
  }
];

export const AppHeader: React.FC = () => {
  const [active, setActive] = React.useState(0);

  const handleItemClick = React.useCallback(
    index => {
      setActive(index);
    },
    [setActive]
  );

  const items = React.useMemo(
    () =>
      HeaderItems.map((item, index) => (
        <Menu.Item
          key={item.name}
          fitted='vertically'
          icon={item.icon}
          name={item.name}
          active={index === active}
          onClick={() => handleItemClick(index)}
        />
      )),
    [active, handleItemClick]
  );

  return (
    <Sticky>
      <Menu pointing secondary>
        {items}
        <Grid>
          <Grid.Column verticalAlign='middle'>
            <Header size='tiny' content='DnD 5e Character Builder' />
          </Grid.Column>
        </Grid>
      </Menu>
    </Sticky>
  );
};
