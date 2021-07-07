import React from 'react'
import event from 'Utils/event'

interface IProps {
  title: string
}
class ListTitle extends React.PureComponent<IProps, unknown> {
  itemChange: any

  componentDidMount() {
    this.itemChange = event.on('ItemChange', (data: any) => {
      console.log(data)
    })
  }

  componentWillUnmount() {
    event.removeListener('ItemChange')
  }

  render() {
    return <p>{this.props.title}</p>
  }
}

export default ListTitle
