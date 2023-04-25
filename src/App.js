import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Route from './components/Route';
import Home from './components/Home';
import Table1 from './components/Table1';
import Table2 from './components/Table2';
import Table3 from './components/Table3';
import Table4 from './components/Table4';
import Table5 from './components/Table5';

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Route/>,
      children:[
        {
          path:"/",
          element:<Home/>,
          children:[
            {
              path:"/table1",
              element:<Table1/>
            },
            {
              path:"/table2",
              element:<Table2/>
            },
            {
              path:"/table3",
              element:<Table3/>
            },
            {
              path:"/table4",
              element:<Table4/>
            },
            {
              path:"/table5",
              element:<Table5/>
            }
          ]
        }
      ]
    }
  ])
  return (
    <div className='tot'>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
