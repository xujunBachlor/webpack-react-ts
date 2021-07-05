import React, { MouseEvent } from 'react'
import 'Base/kurumi.scss'
import violet from './assets/violet.jpg'

interface IProps {
  name: string
}
interface IState {
  ahri: string
}

class Ahri extends React.PureComponent<IProps, IState> {
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
  }

  render() {
    const state = { ...this.state }
    return (
      <div className='kurumi' onClick={(e: MouseEvent) => this.handleClick(e)}>
        <img src={violet} alt='violet' />
        {state.ahri}
      </div>
    )
  }
}

export default Ahri
