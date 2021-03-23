import React from 'react';
import {Route} from 'react-router-dom'
import './App.css';

import WarshipFacts from './components/warshipFacts'
import Layout from './Layout'
import Landing from './components/Landing'
import RandomCats from './components/randomCat'
import RickMortyStuff from './components/RickMortyStuff'
import CardList from './views/PokeTCGStuff'

import {FunStuffContextProvider} from './contexts/FunStuffContext'
import { CSSTransition } from 'react-transition-group'



const routes = [
  { path: '/randomCat', Component: RandomCats },
  { path: '/warshipFacts', Component: WarshipFacts },
  {path: '/RickMortyStuff', Component: RickMortyStuff },
  {path: '/cards', Component: CardList},
  { path: '/', Component: Landing }
]



function App() {
  return (
    
  <FunStuffContextProvider>
    <div className='App'>
      <Layout />
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
             in={match !== null}
             timeout={300}
              classNames='fade'
             unmountOnExit
            >
             <div className='fade'>
               <Component />
             </div>
           </CSSTransition>
          )}
        </Route>
      ))}
      
    </div>
  </FunStuffContextProvider>
    
  );
}

export default App;
