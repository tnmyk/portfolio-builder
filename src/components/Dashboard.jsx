import React from 'react'
import '../css/dashboard.css'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {ImNewTab} from 'react-icons/im'
import { VscRefresh } from "react-icons/vsc";

import { FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
function Dashboard() {
  const {currentUser} =useAuth()
  return (
    <div className="page">
      <h1 className="sub-heading">Dashboard</h1>
      <div className="dashboard-page-btn-grid">
        <Link to="/create-portfolio" className="dashboard-page-btn">
          Create New Portfolio{" "}
          <AiOutlinePlusCircle className="dashboard-page-btn-icons" />
        </Link>

        <Link to="/edit-portfolio" className="dashboard-page-btn">
          Update Portfolio
          <VscRefresh className="dashboard-page-btn-icons" />
        </Link>
        <a
          target="_blank"
          rel="noreferrer"
          href={`/portfolio/${currentUser.displayName}`}
          className="dashboard-page-btn"
        >
          View Portfolio <ImNewTab className="dashboard-page-btn-icons" />
        </a>
        <div className="dashboard-page-btn">
          Profile Settings <FiSettings className="dashboard-page-btn-icons" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard
