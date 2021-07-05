import React from 'react'
import { render } from 'react-dom'
import Ahri from 'Base/ahri'

// webpack实现局部热更新需要的配置
if (module && module.hot) {
  module.hot.accept()
}

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
