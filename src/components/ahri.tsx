import React, { MouseEvent } from 'react'
import 'Base/kurumi.scss'
import { add } from 'Base/utils/math'

interface IProps {
  name: string
}
interface IState {
  ahri: string
}

class Ahri extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      ahri: 'ahri'
    }
  }

  handleClick(e: MouseEvent): void {
    console.log(e)
    this.setState({
      ahri: 'kurumi'
    })
    console.info(add(3, 5))
  }

  render() {
    const state = { ...this.state }
    return (
      <div className='kurumi' onClick={(e: MouseEvent) => this.handleClick(e)}>
        {state.ahri}nice
      </div>
    )
  }
}

export default Ahri
