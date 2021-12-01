import './App.scss';
import Features from './pages/Features';
import Install from './pages/Install';
import Overview from './pages/OverView';
import History from './pages/History';
import Build from './pages/Build';
import Community from './pages/Community';
import Error from './pages/Error';
import { useState, useEffect } from 'react';
import logo from './images/logo.svg'



export const pages = {
  '/overview': <Overview></Overview>,
  '/features': <Features/>,
  '/build': <Build/>,
  '/community': <Community/>,
  '/install': <Install></Install>,
  '/history': <History></History>,
}

function App() {

  const parseLocation = () => window.location.pathname || '/'

  const [page, setPage] = useState<any>(<Overview></Overview>);

  useEffect(() => {
    console.log(window.location.pathname)
    if(parseLocation() === '/') {
      setPage(<Overview></Overview>)
      return
    }

    let newPage = pages[parseLocation()]
    if(newPage) {
      setPage(newPage)
    } else {
      setPage(<Error></Error>)
    }
  }, []);


  return (
    <div className="App">
      <div className="navbar">
        <a href='/' className="home-icon">
          <img className="home-logo" alt="the snowblossum icon" src={logo}></img>
        </a>
        <div className="nav-empty"></div>
        {Object.keys(pages).map(key => {
          let text = key.substring(1).toUpperCase()
          return <a href={key} className='nav'><strong>{text}</strong></a>
        })}
      </div>
      {page}
    </div>
  );
}

export default App;
