import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import Container from './pages/Container/'

// css
import './styles/index.css'
import './styles/other.css'
import './styles/animation.css'

ReactDOM.render(
  <Router>
    <Container />
  </Router>,
  document.getElementById('root'),
)
