"use client"
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Homepage from './Homepage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './FileUpload.jsx';
import '../css/index.css'
import FAQ from './FAQ.jsx';
import Contact from './Contact.jsx';
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import { AuthProvider } from './AuthContext'
import MyFiles from './MyFiles.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import EntryPage from './EntryPage.jsx';


function App() {
  return(
    <>
      <AuthProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
              path="/myfiles"
              element={
                <ProtectedRoute>
                  <MyFiles />
                </ProtectedRoute>
              }
          />
        </Routes>
        <Footer/>
      </AuthProvider>
    </>
  );
}

export default App


      

