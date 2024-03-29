import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter,Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import routers from '../Routers'
import getStore from '../store'

const App = () => {
    return (
        <Provider store={getStore()}>
           <BrowserRouter>
               <div>
                    {routers.map(router=> (
                        <Route{...router}/>
                    ))}
               </div>
           </BrowserRouter>
        </Provider>
    )
}

ReactDom.hydrate(<App/>,document.getElementById('root'))