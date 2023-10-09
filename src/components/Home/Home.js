import React from 'react'
import "./Home.scss";
import {Routes,Route } from 'react-router-dom';
import Domistics from '../Domistics/Domistics';
import Outbound from '../Outbound/Outbound';
import Historical from '../Historical/Historical';
import NileCruise from '../NileCruise/NileCruise';
import DayTours from '../DayTours/DayTours';
import HajjAndOmrah from '../HajjAndOmrah/HajjAndOmrah';
import AllCategories from '../AllCategories/AllCategories';
function Home() {
  return (
    <div className="">
      <div className="head-logo">
      <h1>CIT Travel Dashboard</h1>
      </div>
      <div className="home-section">
      <Routes>
        <Route path="/" element={<AllCategories/>}/>
        <Route path="/domestics" element={<Domistics/>}/>
        <Route path="/outbound" element={<Outbound/>}/>
        <Route path="/historical" element={<Historical/>}/>
        <Route path="/nileCruise" element={<NileCruise/>}/>
        <Route path="/dayTour" element={<DayTours/>}/>
        <Route path="/Hajj" element={<HajjAndOmrah/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default Home