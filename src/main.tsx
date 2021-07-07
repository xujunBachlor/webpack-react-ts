import React from 'react'
import { render } from 'react-dom'
import Ahri from 'Components/ahri'
import List from 'Components/list'

// webpack实现局部热更新需要的配置
if (module && module.hot) {
  module.hot.accept()
}

class App extends React.PureComponent<unknown, unknown> {
  render() {
    return (
      <div>
        <Ahri name='ahri' />
        <List />
      </div>
    )
  }
}

render(<App />, document.querySelector('#root'))

export {}
