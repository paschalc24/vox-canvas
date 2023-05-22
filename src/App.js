import './App.css';
import {useState} from 'react'
import AudioRecorder from "./UIComponents/AudioRecorder"
import background from './images/layer2.svg'
import blob from './images/blob.svg'
import TypeWriterEffect from 'react-typewriter-effect';

function App() {
  const [showBlob, setShowBlob] = useState(true);
  const isMobile = window.innerWidth <= 767;
  return showBlob ? (
      <div className="App">
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}/>
      <header className="header-container">Vox Canvas 🎨</header>
      <div className='blob'
          style={{
          backgroundImage: `url(${blob})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
        <TypeWriterEffect
        textStyle={{ 
          color: "black", 
          fontFamily: 'Mulish', 
          fontSize: isMobile ? '15px' : '25px' 
        }}
        className="typewriter"
        startDelay={0}
        cursorColor= {"transparent"}
        loop="false"
        text={"Hello, welcome to Vox Canvas! \n Press and hold the record button to create AI generated art!"}
        typeSpeed={60}
        eraseSpeed={0}
        />
        <button onClick={() => setShowBlob(false)} className='enter-button' style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>👩‍🎨 👨‍🎨</button>
      </div>
      <div className="footer-container">
        <footer style={{fontSize:"15px", fontWeight:"bold"}}>
          <br></br>
          <a style={{textDecoration:"none", color:"#FFFFFF"}} rel="noreferrer noopener" target="_blank" href="https://www.linkedin.com/in/paschalcorrigan/">LinkedIn 👥</a>
          <span style={{color:"#F5F5F5"}}> ☞ </span>
          <a style={{textDecoration:"none", color:"#FFFFFF"}} rel="noreferrer noopener" target="_blank" href="https://github.com/paschalc24/evil-gpt">GitHub 💻</a><br></br>
        </footer>
      </div>
    </div>
  ) : (
    <div className="App">
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
    </div>
    <header className="header-container">Vox Canvas 🎨</header>
    <AudioRecorder/>
    <div className="footer-container">
      <footer style={{fontSize:"15px", fontWeight:"bold"}}>
        <br></br>
        <a style={{textDecoration:"none", color:"#FFFFFF"}} rel="noreferrer noopener" target="_blank" href="https://www.linkedin.com/in/paschalcorrigan/">LinkedIn 👥</a>
        <span style={{color:"#F5F5F5"}}> ☞ </span>
        <a style={{textDecoration:"none", color:"#FFFFFF"}} rel="noreferrer noopener" target="_blank" href="https://github.com/paschalc24/evil-gpt">GitHub 💻</a><br></br>
      </footer>
    </div>
  </div>
);
}

export default App;
