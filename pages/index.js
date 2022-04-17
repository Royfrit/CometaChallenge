
import React, { useState, useEffect } from 'react';
import {servicesStudentInfo, servicesStudentOrder} from './api/services'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CardContent from './component/CardContent';



export default function Home() {
  const [studentInfo, setStudentInfo] = useState({});
  const [studentOrder, setStudentOrder] = useState([]);
  const servicesStudentInfoFunction = async () => {
    let data = await servicesStudentInfo()
    setStudentInfo(data)
  }

  const servicesStudentOrderFunction = async () => {
    let data = await servicesStudentOrder()
    setStudentOrder(data)
  }

  useEffect(() => {
    servicesStudentInfoFunction()
    servicesStudentOrderFunction()
  }, [])



  return (
    <>
      <AppBar position="static" color="transparent" className="Navbar">
        <div className="content-Navbar">
          <h1 className="title">{studentInfo?.data?.school?.name}</h1>
        </div>  
        <Toolbar/>
      </AppBar>
      <CardContent
        studentInfo={studentInfo}
        studentOrder={studentOrder}
        
      /> 
    </>
  )
}
