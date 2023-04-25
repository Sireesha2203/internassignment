import React from 'react';
import { Outlet,NavLink } from 'react-router-dom';

function Home() {
    const activeStyles={
        fontSize:"1.7rem",
        color:"white",
        fontWeight:"bolder"
    }
    const inActiveStyles={
        fontSize:"1.2rem",
        color:"#eacda3 ",
        fontWeight:"normal"
    }
  return (
    <div>
        <nav className="navbar navbar-expand-sm ">
        <ul className='navbar-nav mx-auto '>
            <div className="collapse navbar-collapse">

            <li className='nav-item me-5 ms-3 pe-3 ps-3 pt-1 pb-1'>
                <NavLink to="/table1" className="nav-link" style={({isActive})=>{return isActive?(activeStyles):(inActiveStyles)}}>Table-1</NavLink>
            </li>
            <li className='nav-item me-5 ms-3 pe-3 ps-3 pt-1 pb-1'>
                <NavLink to="/table2" className="nav-link" style={({isActive})=>{return isActive?(activeStyles):(inActiveStyles)}}>Table-2</NavLink>
            </li>
            <li className='nav-item me-5 ms-3 pe-3 ps-3 pt-1 pb-1'>
                <NavLink to="/table3" className="nav-link" style={({isActive})=>{return isActive?(activeStyles):(inActiveStyles)}}>Table-3</NavLink>
            </li>
            <li className='nav-item me-5 ms-3 pe-3 ps-3 pt-1 pb-1'>
                <NavLink to="/table4" className="nav-link" style={({isActive})=>{return isActive?(activeStyles):(inActiveStyles)}}>Table-4</NavLink>
            </li>
            <li className='nav-item me-5 ms-3 pe-3 ps-3 pt-1 pb-1'>
                <NavLink to="/table5" className="nav-link" style={({isActive})=>{return isActive?(activeStyles):(inActiveStyles)}}>Table-5</NavLink>
            </li>
            </div>
            
        </ul>
        </nav>
        <Outlet/>
    </div>
  )
}

export default Home;