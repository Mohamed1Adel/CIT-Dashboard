import React,{useEffect, useState} from "react";
import "./Home.scss";
import { Routes, Route } from "react-router-dom";
import Domistics from "../Domistics/Domistics";
import Outbound from "../Outbound/Outbound";
import Historical from "../Historical/Historical";
import NileCruise from "../NileCruise/NileCruise";
import DayTours from "../DayTours/DayTours";
import HajjAndOmrah from "../HajjAndOmrah/HajjAndOmrah";
import AllCategories from "../AllCategories/AllCategories";
import UpdateDomestic from "../UpdateCategoryComponents/UpdateDomistic/UpdateDomistic";
import HistorecalTampUpdate from "../UpdateCategoryComponents/HistorecalTampUpdate/HistorecalTampUpdate";
import OutboundTempUpdate from "../UpdateCategoryComponents/outboundTempUpdate/outboundTampUpdate";
import NileCruiseTempUpdate from "../UpdateCategoryComponents/NilseCruiseTempUpdate/NilseCruiseTempUpdate";
import DayTourTampUpdate from "../UpdateCategoryComponents/DayTourTampUpdate/DayTourTampUpdate";
import HajjOmrahTampUpdate from "../UpdateCategoryComponents/HajjOmrahTempUpdate/HajjOmrahTempUpdate";
import UpdateSliderImages from "../UpdateCategoryComponents/UpdateSliderImages/UpdateSliderImages";
import Login from "../Login/Login";
import SideMenu from "../sideMenu/sideMenu";
import { Col, Row } from "react-bootstrap";
function Home() {
  const [isLogged,setIsLogged] = useState(false)

  const userLogin = async(log)=>{
    setIsLogged(await log)
  }
  useEffect(()=>{
localStorage.getItem('userLogin')
  },[])
  return (
    <div className="">
      <div className="head-logo">
        <h1>CIT Travel Dashboard</h1>
      </div>
      <div className="home-section">
        <Routes>
          <Route path="/" element={<Login userLogin={userLogin}/>} />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/all": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <AllCategories />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/domestics": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <Domistics />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/updateDomestic/:id": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <UpdateDomestic />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/outbound": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <Outbound />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/outboundTempUpdate/:id": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <OutboundTempUpdate />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/historical": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <Historical />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/updateProgram/:id": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <HistorecalTampUpdate />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/nileCruise": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <NileCruise />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/nileCruiseTempUpdate/:id": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <NileCruiseTempUpdate />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/dayTour": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <DayTours />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/dayTourTempUpdate/:id": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <DayTourTampUpdate />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/Hajj": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <HajjAndOmrah />
                </Col>
              </Row>
            }
          />
          <Route
            path= { localStorage.getItem('userLogin') === "true" ? "/HajjTempUpdate/:id": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <HajjOmrahTampUpdate />
                </Col>
              </Row>
            }
          />
          {/* <Route
            path= { isLogged ? "/UpdateSliderImages": null }
            element={
              <Row className="p-0 m-0">
                <Col lg="2" className="p-0 m-0">
                  <SideMenu />
                </Col>
                <Col lg="10" className="p-3 m-0">
                  <UpdateSliderImages />
                </Col>
              </Row>
            }
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default Home;


// return (
//   <div className="">
//     <div className="head-logo">
//       <h1>CIT Travel Dashboard</h1>
//     </div>
//     <div className="home-section">
//       <Routes>
//         <Route path="/" element={<Login userLogin={userLogin}/>} />
//         <Route
//           path= { isLogged ? "/all": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <AllCategories />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/domestics": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <Domistics />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/updateDomestic/:id": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <UpdateDomestic />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/outbound": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <Outbound />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/outboundTempUpdate/:id": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <OutboundTempUpdate />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/historical": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <Historical />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/updateProgram/:id": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <HistorecalTampUpdate />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/nileCruise": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <NileCruise />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/nileCruiseTempUpdate/:id": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <NileCruiseTempUpdate />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/dayTour": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <DayTours />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/dayTourTempUpdate/:id": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <DayTourTampUpdate />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/Hajj": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <HajjAndOmrah />
//               </Col>
//             </Row>
//           }
//         />
//         <Route
//           path= { isLogged ? "/HajjTempUpdate/:id": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <HajjOmrahTampUpdate />
//               </Col>
//             </Row>
//           }
//         />
//         {/* <Route
//           path= { isLogged ? "/UpdateSliderImages": null }
//           element={
//             <Row className="p-0 m-0">
//               <Col lg="2" className="p-0 m-0">
//                 <SideMenu />
//               </Col>
//               <Col lg="10" className="p-3 m-0">
//                 <UpdateSliderImages />
//               </Col>
//             </Row>
//           }
//         /> */}
//       </Routes>
//     </div>
//   </div>
// );
