import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import 'bulma'
import './style.scss'
import Main from './components/Main'
import Drawing from './components/Drawing'


class App extends React.Component {
  constructor(){
    super()

    this.state = {
    }
  }

  componentDidMount() {

  }



  render() {
    return (

      <Router>
        <main>

          <Switch>
            <Route path="/corpse/:id" component={Drawing}/>
            <Route path="/" component={Main} />

          </Switch>

        </main>

      </Router>


    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
