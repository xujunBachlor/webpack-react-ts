import React from 'react'
import { render } from 'react-dom'
import Ahri from 'Base/ahri'

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Ahri name='ahri' />
      </div>
    )
  }
}

render(<App />, document.querySelector('#root'))

export {}
