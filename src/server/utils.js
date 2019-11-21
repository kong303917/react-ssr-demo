import React from 'react'//引入React以支持JSX的语法
import { renderToString } from 'react-dom/server'//引入renderToString方法
import { StaticRouter,Route,matchPath } from 'react-router-dom'
import { Provider } from 'react-redux'
import routers from '../Routers'
import getStore from '../store'
 
export const render = (req,res) => {
    //将res传入以使用res.send()方法
    const store = getStore()
    const matchRoutes = []
    const promises = []
    routers.some(route=> {
        matchPath(req.path, route) ? matchRoutes.push(route) : ''
    })
    matchRoutes.forEach( item=> {
        promises.push(item.loadData(store))
    })

    Promise.all(promises).then(()=>{
        //可以console一下看到当前的store已经有数据
        console.log(store.getState())
        const content = renderToString((
           <Provider store={store}>
                <StaticRouter location={req.path} context={{}}>
                    <div>
                        {routers.map(router=> (
                            <Route{...router}/>
                        ))}
                    </div>
               </StaticRouter>
           </Provider>
       ));
 
        res.send(`
           <html>
               <head>
                    <title>ssrdemo</title>
               </head>
               <body>
               <div id="root">${content}</div>
               <script src="/index.js"></script>
               </body>
           </html>
       `)
    })
}