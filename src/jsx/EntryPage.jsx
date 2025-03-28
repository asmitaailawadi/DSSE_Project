import React from 'react';
import { Link } from 'react-router-dom';
import '../css/EntryPage.css';

function EntryPage() {
  return (
    <div className="entry-page">
      <div className="header">
        <h1>DEPARTMENT OF INFORMATION TECHNOLOGY</h1>
        <h2>NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL-575025</h2>
      </div>
      
      <div className="project-info">
        <h3>Information Assurance and Security (IT352) Course Project</h3>
        <h3>Dynamic Searchable Symmetric Encryption</h3>
        <h3>Carried out by</h3>
        <h3>Ashish R Kalgutkar (221IT012)</h3>
        <h3>Asmita Ailawadi (221IT014)</h3>
        <h3>During Academic Session January – April 2025</h3>
      </div>
      
      <div className="buttons-container">
        <Link to="/home">
            <button className="action-button">Go to Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default EntryPage;