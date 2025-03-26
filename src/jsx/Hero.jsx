import React from 'react';
import '../css/Hero.css';
import image from '../assets/opt1.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Secure File Storage Made Simple</h1>
            <p>
              Upload, store, and share your files with confidence. Support for documents, images, audio, and more.
            </p>
            <div className="hero-buttons">
              <Link to="/upload" className="btn-primary">Upload Now</Link> {/* Use Link here */}
              <Link to="/myfiles" className="btn-secondary">My Files</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src={image} alt="File storage illustration"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;