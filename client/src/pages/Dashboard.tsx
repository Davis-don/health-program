import './dashboard.css'
import { MdOutlineDashboard } from "react-icons/md";
import { useState } from 'react';
import Dashboardsection from '../components/Dashboard/Dashboardsection';
import Patients from '../components/patients/Patients';
import Programs from '../components/Programs/Programs';
import Profile from '../components/Clientprofile/Profile';
import useProfileStore from '../store/useProfileStore';
import Searchuser from '../components/search/Searchuser';
import Doctoraccount from '../components/create account/Doctoraccount';
import { IoBagAddOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
function Dashboard() {
  const [dash,setDash] = useState(true)
  const [pat,setPat] = useState(false)
  const [pro,setPro] = useState(false)
  const [search,setSearch] = useState(false)
  const [enroll,setEnroll] = useState(false)
  const [doc,setDoc] = useState(false)
  const profileState = useProfileStore((state) => state.profile);
  const closeProfile = useProfileStore((state) => state.closeProfile); // Function to toggle sidebar

  return (
    <div className='overall-dashboard-container'>
        <div className="top-side-nav-links-header">
          <ul className='top-side-nav-links '>
            <li onClick={()=>{setDash(true);setPat(false);setPro(false);setSearch(false);closeProfile();setEnroll(false);setDoc(false)}} className={dash ? 'activate-link':"top-side-nav-link activate-link card"}><MdOutlineDashboard className='fs-2' /> Dashboard</li>
            <li onClick={()=>{setDash(false);setPat(false);setPro(false);setSearch(false);closeProfile();setEnroll(false);setDoc(true)}} className={doc ? 'activate-link':"top-side-nav-link activate-link card"}><IoMdAdd className='fs-2'/> User</li>
            <li onClick={()=>{setDoc(false);setPat(true);setDash(false);setPro(false);setSearch(false);closeProfile();setEnroll(false)}} className={pat ? 'activate-link':"top-side-nav-link activate-link card"}><IoMdAdd className='fs-2'/> Patients</li>
            <li onClick={()=>{setDoc(false);setPro(true);setDash(false);setPat(false);setSearch(false);closeProfile();setEnroll(false)}} className={pro ? 'activate-link':"top-side-nav-link activate-link card"}><IoMdAdd className='fs-2'/> Programs</li>
            <li onClick={()=>{setDoc(false); setPro(false);setDash(false);setPat(false);setSearch(true);closeProfile()}} className={enroll ? 'activate-link':"top-side-nav-link activate-link card"}><IoBagAddOutline className='fs-2'/> Enroll</li>
           

          </ul>

          <ul className='top-side-nav-links '>
          <li onClick={()=>{setDoc(false);setDash(false);setPat(false);setPro(false);setSearch(true);closeProfile();setEnroll(false)}} className={search ? 'activate-link':"top-side-nav-link activate-link card"}><CiSearch className='fs-2' /> Search</li>
          </ul>
        </div>
        <div className="body-section-cdashboard-container">
        {!profileState && dash && <Dashboardsection/>}
        {!profileState && pat && <Patients/>}
        {!profileState && pro && <Programs/>}
        {!profileState && search && <Searchuser/>}
        {!profileState && doc && <Doctoraccount/>}
        {profileState && <Profile/>}  
        
        </div>
        </div>
  )
}

export default Dashboard