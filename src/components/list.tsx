import React from 'react'
import ListItem from 'Components/listItem'
import ListTitle from 'Components/listTitle'
import IUser from 'Entity/user'
import IListProp from 'Entity/IListProp'
import event from 'Utils/event'

class List extends React.Component<unknown, IListProp> {
  constructor(props: unknown) {
    super(props)
    this.state = {
      title: 'ahri',
      list: [
        {
          id: 0,
          name: 'kurumi',
          checked: false
        },
        {
          id: 1,
          name: 'violet',
          checked: false
        },
        {
          id: 2,
          name: 'akali',
          checked: false
        }
      ]
    }
  }

  onItemChange(id: number) {
    const { list } = this.state
    const item = list.find((x) => x.id === id)
    if (item) {
      item.checked = !item.checked
    }
    event.emit('ItemChange', item)
    this.setState({
      list
    })
  }

  render() {
    const { title, list } = this.state
    return (
      <div>
        <ListTitle title={title} />
        <ul>
          {list.map(
            (entry: IUser): JSX.Element => (
              <ListItem
                value={entry.name}
                key={`list-${entry.id}`}
                checked={entry.checked}
                handleChange={() => this.onItemChange(entry.id)}
              />
            )
          )}
        </ul>
      </div>
    )
  }
}
export default List
