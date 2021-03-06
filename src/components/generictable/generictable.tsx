import * as React from 'react';
import {
  Table,
  StrictTableProps,
  StrictTableCellProps,
  TextArea,
  Form,
  Label,
  Input,
  Container,
  Button,
  Icon,
  Divider,
  Dropdown,
  Segment
} from 'semantic-ui-react';

export interface IGenericCellProps {
  title: string;
  lines?: number;
  hasModifier?: boolean;
}

export interface IGenericTableHeaderCellProps extends IGenericCellProps {
  key: string;
}

export interface IGenericTableCellProps extends StrictTableCellProps {
  saveKey: string;
  lines?: number;
  hasModifier?: boolean;
  style?: { [key: string]: string };
}

export interface IGenericTableProps extends StrictTableProps {
  items: IGenericTableHeaderCellProps[];
  vertical?: boolean;
  editable?: boolean;
}

export const GenericTableCell: React.FC<IGenericTableCellProps> = React.memo(
  (props: IGenericTableCellProps) => {
    const { saveKey, lines, hasModifier, ...cellProps } = props;

    const [inputValue, updateInputValue] = React.useState('');

    const onMainInputChange = React.useCallback(
      (event: React.SyntheticEvent<HTMLTextAreaElement, Event>) => {
        const targetValue = (event.target as HTMLTextAreaElement).value;
        console.log(`key: ${saveKey} -> value: ${targetValue}`);

        updateInputValue(targetValue);
      },
      [saveKey]
    );

    const isSingleLineInput = React.useCallback(() => {
      return !!(!lines || lines <= 1);
    }, [lines]);

    const cellModifierLabel = React.useMemo(() => {
      return hasModifier ? (
        <Label
          size='mini'
          corner
          content={
            <Input
              transparent
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                height: '20px',
                width: '18px',
                fontSize: '14px',
                textAlign: 'center'
              }}
            />
          }
        />
      ) : null;
    }, [hasModifier]);

    return (
      <Table.Cell {...cellProps}>
        <Form>
          {cellModifierLabel}
          <TextArea
            value={inputValue}
            onChange={e => onMainInputChange(e)}
            rows={isSingleLineInput() ? 1 : lines}
            style={{
              resize: isSingleLineInput() ? 'none' : 'vertical',
              textAlign: isSingleLineInput() ? 'center' : 'left'
            }}
          ></TextArea>
        </Form>
      </Table.Cell>
    );
  }
);

const GenericHorizontalTable: React.FC<IGenericTableProps> = React.memo(
  (props: IGenericTableProps) => {
    const { items, ...tableProps } = props;

    const tableHeaders = React.useMemo(
      () =>
        items.map(item => (
          <Table.HeaderCell key={`Header_${item.key}`} textAlign='center'>
            {item.title}
          </Table.HeaderCell>
        )),
      [items]
    );

    const tableContent = React.useMemo(
      () =>
        items.map(item => (
          <GenericTableCell
            key={`Cell_${item.key}`}
            saveKey={item.key}
            lines={item.lines}
            hasModifier={item.hasModifier}
          />
        )),
      [items]
    );

    return (
      <Table {...tableProps} fixed>
        <Table.Header>
          <Table.Row>{tableHeaders}</Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>{tableContent}</Table.Row>
        </Table.Body>
      </Table>
    );
  }
);

export const GenericVerticalTable: React.FC<IGenericTableProps> = React.memo(
  (props: IGenericTableProps) => {
    const { items, ...tableProps } = props;

    const tableRows = React.useMemo(
      () =>
        items.map(item => (
          <Table.Row key={item.key}>
            <Table.Cell width='7' key={`Header_${item.key}`} textAlign='center'>
              {item.title}
            </Table.Cell>
            <GenericTableCell
              key={`Cell_${item.key}`}
              saveKey={item.key}
              lines={item.lines}
              hasModifier={item.hasModifier}
            />
          </Table.Row>
        )),
      [items]
    );

    return (
      <Table {...tableProps} fixed definition>
        <Table.Body>{tableRows}</Table.Body>
      </Table>
    );
  }
);

interface GenericEditableContent {
  type: 'dropdown';
  options?: IGenericTableHeaderCellProps[];
}

export const GenericEditableContent: React.FC<
  GenericEditableContent
> = React.memo((props: GenericEditableContent) => {
  const { type, options } = props;

  const dropDownOptions = React.useMemo(
    () =>
      options &&
      options.map(item => {
        return { text: item.title, value: item.title };
      }),
    [options]
  );

  return (
    <>
      <Divider />
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'row'
        }}
      >
        <Button basic icon>
          <Icon name='plus' />
        </Button>
        <Dropdown
          fluid
          basic
          selection
          options={dropDownOptions}
          defaultValue={dropDownOptions && dropDownOptions[0].text}
        />
      </Container>
    </>
  );
});

export const GenericTable: React.FC<IGenericTableProps> = React.memo(
  (props: IGenericTableProps) => {
    const { items, vertical, editable, color, ...tableProps } = props;

    const [isEditing, toggleEditing] = React.useState(false);

    const innerTableProps = React.useMemo(() => {
      return {
        items,
        style: {
          marginTop: '15px'
        },
        ...tableProps
      };
    }, [items, color, tableProps]);

    console.log('items', items);

    return (
      <Container
        fluid
        style={{
          position: 'relative'
        }}
      >
        {editable ? (
          <Label
            as='button'
            color={isEditing ? color : undefined}
            onClick={() => {
              toggleEditing(prev => !prev);
              console.log(`isEditing: ${isEditing}`);
            }}
            style={{
              position: 'absolute',
              right: '0',
              top: '-40px',
              margin: 0,
              outline: 'none'
            }}
          >
            <Icon name='edit' /> Edit
          </Label>
        ) : null}
        {vertical ? (
          <GenericVerticalTable {...innerTableProps} />
        ) : (
          <GenericHorizontalTable {...innerTableProps} />
        )}
        {isEditing ? (
          <GenericEditableContent type='dropdown' options={items} />
        ) : null}
      </Container>
    );
  }
);
