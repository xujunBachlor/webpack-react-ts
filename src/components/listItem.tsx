import React from 'react'
import classnames from 'classnames'
import '../static/listItem.scss'

interface IProps {
  value: string
  checked: boolean
  handleChange: () => unknown
}

class ListItem extends React.PureComponent<IProps, unknown> {
  render() {
    const { value, checked, handleChange } = this.props
    const className = classnames({
      checked
    })
    return (
      <li className={className}>
        <input checked={checked} onChange={handleChange} type='checkbox' />
        <span>{value}</span>
      </li>
    )
  }
}

export default ListItem
