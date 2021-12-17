import './App.scss';
import './scss/NavBar.scss';
import Features from './pages/Features';
import Install from './pages/Install';
import Overview from './pages/OverView';
import History from './pages/History';
import Build from './pages/Build';
import Community from './pages/Community';
import Error from './pages/Error';
import { useState, useEffect } from 'react';
import logo from './assets/snowblossom/vectorshape_snowblossom_coin_colour.svg';
import menuOpen from './assets/misc/menu-down.svg';
import menuNormal from './assets/misc/menu-button-wide-fill.svg';

export const pages = {
  '#overview': <Overview></Overview>,
  '#features': <Features/>,
  '#build': <Build/>,
  '#community': <Community/>,
  '#install': <Install></Install>,
  '#history': <History></History>,
}


function App() {

  const parseLocation = () => window.location.hash

  const [page, setPage] = useState<any>(<Overview></Overview>);

  useEffect(() => {
    if (window.location.hash === "") {
      if(window.location.pathname === '/') {
        setPage(<Overview></Overview>)
        return
      }
      setPage(<Error></Error>)
      return
    }

    let newPage = pages[parseLocation()]
    if(newPage) {
      setPage(newPage)
    } else {
      setPage(<Error></Error>)
    }
  }, []);

  function handleNavClick(path, isMobile = false) {
    let newPage = pages[path]
    if(newPage) {
      setPage(newPage)
      window.history.replaceState(null, document.title, `/${path}`)
    } else {
      setPage(<Error></Error>)
      window.history.replaceState(null, document.title, "/#error")
    }
    if(isMobile) {
      resetMobileMenu()
    }
  }

  function resetMobileMenu() {
    const dropdown: HTMLElement = document.querySelector('.dropdown')
    const menuOpen: HTMLImageElement = document.querySelector('.menu-open')
    const menuNormal: HTMLImageElement = document.querySelector('.menu-normal')
    dropdown.dataset.open = "false"
    dropdown.classList.add('close-dropdown')
    dropdown.classList.remove('open-dropdown')
    menuOpen.style.display = "none"
    menuNormal.style.display = "block"
  }

  function handleMenuClick() {
    const dropdown: HTMLElement = document.querySelector('.dropdown')
    const menuOpen: HTMLImageElement = document.querySelector('.menu-open')
    const menuNormal: HTMLImageElement = document.querySelector('.menu-normal')

    if(dropdown.dataset.open === "false") {
      dropdown.dataset.open = "true"
      dropdown.classList.add('open-dropdown')
      dropdown.classList.remove('close-dropdown')
      menuNormal.style.display = "none"
      menuOpen.style.display = "block"
    } else {
      resetMobileMenu()
    }
  }


  return (
    <div className="App">
      <div className="navbar">
        <button onClick={() => handleNavClick("#overview", true)} className="home-icon">
          <img className="home-logo" alt="the snowblossum icon" src={logo}></img>
        </button>
        <div className="nav-empty"></div>
        <div data-open="false" className="dropdown">
          {Object.keys(pages).map((path, index) => {
            let text = path.substring(1).toUpperCase()
            return <button key={index} onClick={() => handleNavClick(path, true)} className='nav'><strong>{text}</strong></button>
          })}
        </div>
        <button onClick={() => handleMenuClick()} className="nav-links-container-mobile">
          <img className='menu-normal' src={menuNormal} alt="menu-normal"></img>
          <img className='menu-open' src={menuOpen} alt="menu-open"></img>
        </button>
        <div className="nav-links-container-desktop">
          {Object.keys(pages).map((path, index) => {
            let text = path.substring(1).toUpperCase()
            return <button key={index} onClick={() => handleNavClick(path)} className='nav'><strong>{text}</strong></button>
          })}
        </div>
      </div>
      {page}
    </div>
  );
}

export default App;
